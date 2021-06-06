import { Pipe, PipeTransform } from '@angular/core';
import {CampaignState} from "../../entities/campaign";

@Pipe({
  name: 'campaignState'
})
export class CampaignStatePipe implements PipeTransform {

  transform(value: CampaignState, ...args: unknown[]): unknown {
    switch(value) {
      case CampaignState.IN_PROGRESS: return "En cours";
      case CampaignState.PROVISORY: return "Provisoire";
      case CampaignState.REALISED: return "Réalisée";
      case CampaignState.VALIDATED: return "Validée";
    }
  }

}
