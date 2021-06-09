import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable, of } from 'rxjs';
import { BusinessType } from '../../../entities/businessType';
import { Product } from '../../../entities/product';
import { Customer } from '../../../entities/customer';
import { Campaign, CampaignState } from '../../../entities/campaign';
import { Town } from '../../../entities/town';
import { BusinessTypeService } from '../../../services/business-type.service';
import { CampaignService } from '../../../services/campaign.service';
import { TownService } from '../../../services/town.service';
import { ProductService } from 'app/services/product.service';
import { CustomerService } from 'app/services/customer.service';
import { BusinessService } from 'app/services/business.service';
import { types } from 'util';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Business } from 'app/entities/business';
import { CampaignStatePipe } from 'app/shared/pipes/campaign-state.pipe';


@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.scss'],
  providers: [DatePipe]
})
export class CampaignEditComponent implements OnInit {

  public products: Array<Product> = [];
  public customers: Array<Customer> = [];
  private foundBusinesses: Array<any> = [];
  private savedBusinesses: Array<any> = [];

  constructor(private businessTypeService: BusinessTypeService,
    private townService: TownService,
    private campaignService: CampaignService,
    private productService: ProductService,
    private customerService: CustomerService,
    private businessService: BusinessService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private location: Location,
    private toastr: ToastrService,
    private router: Router,
    private httpClient: HttpClient) {
    this.route.params.subscribe((params) => {
      this.id = params.id ? parseInt(params.id) : undefined;
    });
    this.apiLoaded = this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  public id?: number;
  public towns: Array<Town> = [];
  public businessTypes: Array<BusinessType> = [];
  public product: Array<Product> = [];
  public customer: Array<Customer> = [];
  public form: FormGroup;

  public searchResult: any = {};
  public searched: boolean = false;
  apiLoaded: Observable<boolean>;
  public savedResults: any = {};

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(this.id),
      label: new FormControl("", Validators.required),
      startDate: new FormControl("", Validators.required),
      endDate: new FormControl("", Validators.required),
      state: new FormControl({ value: "PROVISORY" }),
      customer: new FormControl(),
      product: new FormControl(),
      description: new FormControl(""),
      towns: new FormControl([]),
      types: new FormControl([])
    });


    if (this.id) {
      this.form.controls["state"].enable();
    }
    const calls: Observable<any>[] = [
      this.businessTypeService.findAll(),
      this.townService.findContainingText(""),
      this.productService.findAll(),
      this.customerService.findAll()
    ];
    this.id && calls.push(this.campaignService.findById(this.id));
    forkJoin(calls).subscribe(([response1, response2, response3, response4, response5]: Array<any>) => {
      this.businessTypes = response1.data;
      this.towns = response2.data;
      this.products = response3.data;
      this.customers = response4.data;
      if (this.id) {
        let { id, label, state, customer, product, description, towns, types, } = response5.data;
        const startDate = this.datePipe.transform(new Date(response5.data.startDate), "yyyy-MM-dd");
        const endDate = this.datePipe.transform(new Date(response5.data.endDate), "yyyy-MM-dd");
        customer = this.customers.find(c => c.id === customer.id);
        product = this.products.find(c => c.id === product.id);
        this.form.setValue({ id, label, startDate, state, customer, product, description, towns, types, endDate });
        this.savedBusinesses = response5.data.businesses;
        this.buildBusinessIndex();
      }
    });
  }

  private buildBusinessIndex() {
    this.savedResults = {};
    for(const business of this.savedBusinesses.filter(b => !!b.town && !!b.type)) {
      this.savedResults[business.town.id] = this.savedResults[business.town.id] || {};
      this.savedResults[business.town.id][business.type.id] = this.savedResults[business.town.id][business.type.id] || [];
      this.savedResults[business.town.id][business.type.id].push(business);
    }
  }


  public onTownsTextChange(text) {
    this.townService.findContainingText(text).subscribe((response: any) => {
      this.towns = response.data;
    });
  }

  public save() {
    const campaign: Campaign = this.form.value;
    if (campaign.state === CampaignState.VALIDATED) {
      campaign.businesses = this.foundBusinesses;
    }
    this.campaignService.save(campaign).subscribe((response: any) => {
      this.toastr.success("Votre campagne a été sauvegardée avec succés !", "Très bien !", { positionClass: "toast-center-center" });
      
        setTimeout(() => {
          this.router.navigate(["pages/campaigns"], { replaceUrl: true });
        });
      
    });
  }

  public goBack() {
    this.router.navigate(["pages/campaigns"]);
  }

  public search() {
    this.searchResult = {};
    const { types, towns } = this.form.value;
    for (const town of towns) {
      this.searchResult[town.id] = {};
      const { lng: longitude, lat: latitude } = town;
      for (const businessType of types) {
        const type = businessType.mapCode;
        this.businessService.nearbySearch(latitude, longitude, type).subscribe((response: any) => {
        
          this.searchResult[town.id][businessType.id] = response.results;
          this.foundBusinesses.push.apply(this.foundBusinesses, response.results.map(r => {
            return <Business>{
              placeId: r.place_id,
              mapCode: r.place_id,
              type: businessType,
              vicinity: r.vicinity,
              lat: r.geometry.location.lat,
              lng: r.geometry.location.lng,
              name: r.name,
              town: town
            }
          }));
        });
        this.searched = true;
      }
    }
  }

  public getIndex(townId, typeId) {
    let index = this.searchResult;
    if (this.form.value.state === CampaignState.VALIDATED) {
      index = this.savedResults;
    }
    return index[townId][typeId] || [];
  }

  public isValidated() {
    return this.form.value.state === CampaignState.VALIDATED;
  }

}
