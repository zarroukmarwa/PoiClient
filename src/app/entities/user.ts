import {Role} from './role';
export default class User {
   id: number = 0;
   login: string = "";
   firstName: string = "";
   lastName: string = "";
   fullName: string = "";
   role: Role;
   constructor(user: User) {
       this.id = user.id;
       this.login = user.login;
       this.firstName = user.firstName;
       this.lastName = user.lastName;
       this.fullName = user.fullName;
       this.role = user.role;
   }
}