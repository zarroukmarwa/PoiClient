import { Component, OnInit } from '@angular/core';
import User from 'app/entities/user';
import {Role} from 'app/entities/role';
import { UserService } from 'app/services/user.service';
import { RoleService } from 'app/services/role.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: User[] = [];
  public Users: Array<User>  = [];
  public count: number = 0;
  public pagesCount: number = 0;
  public pageSize: number = 5;
  public user: User ;
  
  constructor(private router: Router ,private userService: UserService, private roleService: RoleService) { }

  ngOnInit() {
    this.userService.findAndCount({}).subscribe((response: any) => {
      this.users = response.data.records;  
      this.count = response.data.count;
      this.pagesCount = Math.ceil(this.count / this.pageSize);
    });
  }

}
