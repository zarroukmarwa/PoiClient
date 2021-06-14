import { Component, QueryList,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Campaign } from "../../../entities/campaign";
import { CampaignService } from "../../../services/campaign.service";


@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit{

  public campaigns: Campaign[] = [];
  public count: number = 0;
  public pagesCount: number = 0;
  public pageSize: number = 5;
  public page: number = 1;


  constructor(private router: Router, private campaignService: CampaignService) {
  }

  ngOnInit() {
    this.campaignService.findAndCount({}).subscribe((response: any) => {
      this.campaigns = response.data.records;
      this.count = response.data.count;
      this.pagesCount = Math.ceil(this.count / this.pageSize);
    });
  }

  public addCampaign(): void {
    this.router.navigate(["pages/campaign"]);
  }

  public editCampaign(id: number): void {
    this.router.navigate(["pages/campaign", id]);
  }

  public removeCampaign(id: number): void {
  }

  public realizeCampaign(id: number): void {
    this.router.navigate(["pages/campaignRealiazation", id]);

  }

}