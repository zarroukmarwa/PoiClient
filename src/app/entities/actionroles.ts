import {Action} from "./action";
import { Role } from "./role";

export enum etatAcces {
   ACTIF = "Actif",
   INACTIF = "Inactif"
 }

export class ActionRoles {

   public id: number = 0;
   public action?: Action;
   public role?: Role;
   public etat: etatAcces = etatAcces.ACTIF;
}