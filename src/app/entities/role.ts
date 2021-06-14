export enum RoleEtat {
   ACTIF = "ACTIF",
   INACTIF = "INACTIF"
}

export class Role {

   roleId: number = 0;
   type: string;
   etat: RoleEtat = RoleEtat.ACTIF;

}