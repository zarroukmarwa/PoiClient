import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'app/entities/business';
import { Campaign } from 'app/entities/campaign';
import { CampaignService } from 'app/services/campaign.service';
import { ToastrService } from 'ngx-toastr';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
import swal from 'sweetalert2';

import pptxgen from "pptxgenjs";

@Component({
  selector: 'app-campaign-realization',
  templateUrl: './campaign-realization.component.html',
  styleUrls: ['./campaign-realization.component.scss']
})
export class CampaignRealizationComponent implements OnInit {

  public id: number;
  public campaign: Campaign;
  private campaignBusinesses: Array<any> = [];

  constructor(private campaignService: CampaignService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.params.subscribe((params) => {
      this.id = params.id ? parseInt(params.id) : undefined;
    })
  }

  public types: Array<any> = [];
  public index: any = {};
  public mediasByBusiness: any = {};
  public hiddenGalleries: any = {};

  ngOnInit() {
    this.index = {};
    this.campaignService.findById(this.id).subscribe((respone: any) => {
      this.campaign = respone.data;
    });
    this.campaignService.getCampaignBusinesses(this.id).subscribe((response: any) => {
      this.campaignBusinesses = response.data;
      for (const campaignBusiness of response.data) {
        let type = this.types.find(t => t.id === campaignBusiness.business.type.id);
        if (!type) {
          type = campaignBusiness.business.type;
          this.types.push(type);
          type.businesses = [];
        }
        type.businesses.push(campaignBusiness.business);
        this.index[campaignBusiness.business.id] = campaignBusiness;
        this.mediasByBusiness[campaignBusiness.business.id] = campaignBusiness.medias.map(m => {
          const image = m.content, thumbImage = m.content;
          return { image, thumbImage };
        });

      }
      this.types = this.types.sort((a, b) => {
        var nameA = a.label.toUpperCase(); // ignore upper and lowercase
        var nameB = b.label.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    });
  }

  public toggleVisited(businessId: number) {
    this.campaignService.visitBusiness(this.id, businessId).subscribe((response: any) => {
      this.index[businessId].visited = response.data.visited;
    });
  }

  public handleFileInput(files: any[], business: number) {
    const reader = new FileReader();
    const img = files[0];
    reader.addEventListener('load', (event) => {
      const content = (event.target as any).result;
      const campaign = this.id;
      const media = {
        business,
        campaign,
        content
      }
      this.campaignService.uploadMedia(campaign, business, media).subscribe((response: any) => {
        this.index[business].medias.push(response.data);
        this.mediasByBusiness[business].push({ image: response.data.content, thumbImage: response.data.content });
        this.reloadGallery(business);
      });
    });
    reader.readAsDataURL(img);
  }

  private reloadGallery(business: number) {
    this.hiddenGalleries[business] = true;
    setTimeout(() => this.hiddenGalleries[business] = false);
  }

  public exportPPT() {
    let pres = new pptxgen();
    const types = this.types.filter(t => this.campaignBusinesses.filter(cb => cb.medias.length && cb.business!.type.id === t.id));
    for(const type of types) {
      let slide = pres.addSlide();
      let textboxText = type.label[0].toUpperCase() + type.label.substr(1);
      slide.addText(textboxText, typeStyle);
      for(const business of type.businesses) {
        slide = pres.addSlide();
        slide.addText(business.name, businessStyle);
        for(const media of this.mediasByBusiness[business.id]) {
          if (this.mediasByBusiness[business.id].indexOf(media) > 0) {
            slide = pres.addSlide();
          }
          slide.addImage({
            data: media.image,
            x: 1,
            y: 1,
            w: "75%",
            h: "75%"
          });
        }
      }
    }
    pres.writeFile();
  }
  public removeconfirmText(id) {
    swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière !"+id,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.value) {
        this.removeImage();
        swal.fire(
          'Supprimé!',
          'Votre fichier a été supprimé.',
          'success'
        )
      }
    })
  }
  
  
  public removeImage(){

  }

}

const typeStyle = { x: 3, y: 3, color: "363636", fontSize: 40};
const businessStyle = { x: 1, y: 0.5, color: "363636", fontSize: 30}
