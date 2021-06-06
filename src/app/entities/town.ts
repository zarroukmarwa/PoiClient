import { Campaign } from "./campaign";

export class Town {

   public id: number = 0;

   public city: string = "";

   public postalCode: string = "";

   public region: string = "";

   public department: string = "";

   public canton: string = "";

   public borough: string = "";

   public lat: number = 0;

   public lng: number = 0;

   public campaigns?: Campaign[];

}