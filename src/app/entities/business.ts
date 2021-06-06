import { BusinessType } from "./businessType";
import { Campaign } from "./campaign";

export class Business {

   public id: number = 0;

   public name: string = "";

   public mapCode: string = "";

   public lat: number = 0;

   public lng: number = 0;

   public vicinity: number = 0;

   public type?: BusinessType;

}