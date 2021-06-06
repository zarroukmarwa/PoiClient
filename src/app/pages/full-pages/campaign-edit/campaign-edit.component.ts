import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, forkJoin, Observable } from 'rxjs';
import { BusinessType } from '../../../entities/businessType';
import { Product } from '../../../entities/product';
import { Customer } from '../../../entities/customer';
import { Campaign } from '../../../entities/campaign';
import { Town } from '../../../entities/town';
import { BusinessTypeService } from '../../../services/business-type.service';
import { CampaignService } from '../../../services/campaign.service';
import { TownService } from '../../../services/town.service';
import { ProductService } from 'app/services/product.service';
import { CustomerService } from 'app/services/customer.service';


@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.scss'],
  providers: [DatePipe]
})
export class CampaignEditComponent implements OnInit {

  public products: Array<Product> = [];
  public customers: Array<Customer> = [];

  constructor(private businessTypeService: BusinessTypeService,
    private townService: TownService,
    private campaignService: CampaignService,
    private productService: ProductService,
    private customerService: CustomerService,

    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private location: Location,
    private toastr: ToastrService,
    private router: Router) {
    this.route.params.subscribe((params) => {
      this.id = params.id ? parseInt(params.id) : undefined;
    })
  }

  public id?: number;
  public towns: Array<Town> = [];
  public businessTypes: Array<BusinessType> = [];
  public product: Array<Product> = [];
  public customer: Array<Customer> = [];
  public form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(this.id),
      label: new FormControl("", Validators.required),
      startDate: new FormControl("", Validators.required),
      endDate: new FormControl("", Validators.required),
      state: new FormControl({ value: "PROVISORY"}),
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
        this.form.setValue({ id, label, startDate, state, customer, product, description,towns, types, endDate });
      }
    });
  }


  public onTownsTextChange(text) {
    this.townService.findContainingText(text).subscribe((response: any) => {
      this.towns = response.data;
    });
  }

  public save() {
    const campaign: Campaign = this.form.value;
    this.toastr.success
    this.campaignService.save(campaign).subscribe((response: any) => {
      this.toastr.success("Votre campagne a été sauvegardée avec succés !", "Très bien !", { positionClass: "toast-top-center" });
      if (!this.id) {
        setTimeout(() => {
          this.router.navigate(["pages/campaigns"], { replaceUrl: true });
        });
      }
    });
  }

  public goBack() {
    this.router.navigate(["pages/campaigns"]);
  }

}
