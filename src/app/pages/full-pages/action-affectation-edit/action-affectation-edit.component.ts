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
  selector: 'app-action-affectation-edit',
  templateUrl: './action-affectation-edit.component.html',
  styleUrls: ['./action-affectation-edit.component.scss']
})
export class ActionAffectationEditComponent implements OnInit {


  public roles: Array<Role> = [];
  public rolesActif: Array<Role> = [];
  public actions: Array<Action> = [];
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private actionService: ActionService,
    private actionrolesService: ActionrolesService,
    private roleService: RoleService,
    private router: Router) {
    this.route.params.subscribe((params) => {
      this.id = params.id ? parseInt(params.id) : undefined;
    })
  }

  public id?: number;
  public role: Array<Role> = [];
  public form: FormGroup;

  ngOnInit(): void {
    
    this.form = new FormGroup({
      id: new FormControl(this.id),
      action: new FormControl(),
      role: new FormControl(),
      etat: new FormControl({ value: "ACTIF" })
    });


    if (this.id) {
      this.form.controls["etat"].enable();
    }
    const calls: Observable<any>[] = [
      this.roleService.findAll(),
      this.actionService.findAll()
    ];
    this.id && calls.push(this.actionrolesService.findById(this.id));
    forkJoin(calls).subscribe(([response1, response2, response3]: Array<any>) => {
      this.roles = response1.data;
      this.rolesActif = this.roles.filter( r=>r.etat === 'ACTIF' );
      this.actions = response2.data;
      if (this.id) {
        let { id, role, action, etat, } = response3.data;
        role = this.roles.find(c => c.roleId === role.id);
        action = this.actions.find(a => a.actionId === action.id);
        this.form.setValue({ id, role, action, etat });

      }
    });
   

  }
  public save() {
    const actionroles: ActionRoles = this.form.value;
    console.log(actionroles.id)
    this.toastr.success
    this.actionrolesService.save(actionroles).subscribe((response: any) => {
      this.toastr.success("Votre Affectation a été sauvegardée avec succés !", "Très bien !", { positionClass: "toast-center-center" });
      
        setTimeout(() => {
          this.router.navigate(["pages/affectation"], { replaceUrl: true });
        });
      
    });
  }

  public goBack() {
    this.router.navigate(["pages/affectation"]);
  }
}
