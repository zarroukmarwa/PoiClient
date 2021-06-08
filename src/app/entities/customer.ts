import {Campaign} from './campaign';
import User from './user';

export class Customer {
   id: number = 0;
   name: string = "";
   phone : string;
   adress :string ;
   email : string
   campaigns: Campaign[];
   user: User;
   
}