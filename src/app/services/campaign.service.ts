import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Campaign } from '../entities/campaign';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  constructor(private httpClient: HttpClient) { }

  public save(campaign: Campaign) {
    return this.httpClient.post(`${environment.apiBase}/campaign`, campaign);
  }

  public findAndCount(criteria: any) {
    return this.httpClient.post(`${environment.apiBase}/campaign/findAndCount`, criteria);
  }

  public findById(id: number) {
    return this.httpClient.get(`${environment.apiBase}/campaign/${id}`);
  }

  public getCampaignBusinesses(id: number) {
    return this.httpClient.get(`${environment.apiBase}/campaign/${id}/businesses`);
  }

  public visitBusiness(campaignId: number, businessId: number) {
    return this.httpClient.patch(`${environment.apiBase}/campaign/${campaignId}/business/${businessId}`, {});
  }

  public uploadMedia(campaignId: number, businessId: number, media) {
    return this.httpClient.post(`${environment.apiBase}/campaign/${campaignId}/business/${businessId}`, media);
  }

}
