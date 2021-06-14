import { Component, OnInit } from '@angular/core';
import { Role } from "../../../entities/role";
import { RoleService } from "../../../services/role.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  public roles: Role[] = [];
  public count: number = 0;
  public pagesCount: number = 0;
  public pageSize: number = 5;


  constructor(private router: Router , private roleService: RoleService) {
  }

  ngOnInit() {
    this.roleService.findAndCount({}).subscribe((response: any) => {
      this.roles = response.data.records;
      this.count = response.data.count;
      this.pagesCount = Math.ceil(this.count / this.pageSize);
    });
  }

  public addRole(): void {
    this.router.navigate(["pages/role"]);
  }

  public editRole(id: number): void {
    this.router.navigate(["pages/role", id]);
  }

  public removeRole(id: number): void {

  }
  public affecteAction(): void {
    this.router.navigate(["pages/affectation"]);
  }

}
