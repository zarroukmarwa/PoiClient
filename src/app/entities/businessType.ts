import { Business } from "./business";
import { Campaign } from "./campaign";

export class BusinessType {

   public id: number = 0;

   public label: string = "";

   public mapCode: string = "";

   public businesses?: Business[];

   public campaigns?: Campaign[];
}