import { Business } from "./business";
import { BusinessType } from "./businessType";
import { Product } from "./product";
import { Customer } from "./customer";

import { Town } from "./town";
import User from "./user";

export enum CampaignState {
    PROVISORY = "PROVISORY",
    VALIDATED = "VALIDATED",
    IN_PROGRESS = "IN_PROGRESS",
    REALISED = "REALISED"
 }

export class Campaign {

   public id: number = 0;

   public label: string = "";

   public startDate: Date = new Date();

   public description?: string;

   public state: CampaignState = CampaignState.PROVISORY;

   public owner?: User;

   public customer?: Customer;

   public product?: Product;

   public types?: BusinessType[];

   public businesses?: Business[];

   public towns?: Town[];
}