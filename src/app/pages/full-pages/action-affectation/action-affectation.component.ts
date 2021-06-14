import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'app/entities/customer';
import { ActionService } from 'app/services/action.service';
import { RoleService } from 'app/services/role.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable } from 'rxjs';
import  { Role }  from '../../../entities/role';
import  { Action }  from '../../../entities/action';
import { ActionRoles } from 'app/entities/actionroles';
import { ActionrolesService } from 'app/services/actionroles.service';

@Component({
  selector: 'app-action-affectation',
  templateUrl: './action-affectation.component.html',
  styleUrls: ['./action-affectation.component.scss']
})
export class ActionAffectationComponent implements OnInit {

  constructor(private router: Router , private actionrolesService: ActionrolesService, private actionService:ActionService, private roleService:RoleService) {
  }

  public affectations: ActionRoles[] = [];
  public action: Array<Action> = [];
  public role: Array<Role> = [];

  public count: number = 0;
  public pagesCount: number = 0;
  public pageSize: number = 5;

  ngOnInit(): void {
   this.actionrolesService.findAndCount({}).subscribe((response: any) => {
      this.affectations = response.data.records;
      this.count = response.data.count;
      this.pagesCount = Math.ceil(this.count / this.pageSize);
     // user = this.users.find(c => c.id === user.id);
    });   

  }
  public addAffectation(): void {
    this.router.navigate(["pages/affectation"]);
  }

  public editAffectation(id: number): void {
    this.router.navigate(["pages/affectation", id]);
  }

  public removeAffectation(id: number): void {
  }
}
