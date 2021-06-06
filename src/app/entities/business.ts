import { BusinessType } from "./businessType";
import { Town } from "./town";

export class Business {

   public id: number = 0;

   public name: string = "";

   public placeId: string = "";

   public mapCode: string = "";

   public lat: number = 0;

   public lng: number = 0;

   public vicinity: number = 0;

   public type?: BusinessType;

   public town?: Town;

}