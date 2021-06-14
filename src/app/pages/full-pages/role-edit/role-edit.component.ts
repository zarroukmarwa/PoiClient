import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../../entities/role';
import { RoleService } from 'app/services/role.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable, of } from 'rxjs';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private roleService: RoleService,
    private router: Router) {
    this.route.params.subscribe((params) => {
      this.roleId = params.id ? parseInt(params.id) : undefined;
    })
  }

  public roleId?: number;
  public form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      roleId: new FormControl(this.roleId),
      type: new FormControl("", Validators.required),
      etat: new FormControl("", Validators.required),
    });
   
    const calls: Observable<any>[] = [];
    this.roleId && calls.push(this.roleService.findById(this.roleId));
      forkJoin(calls).subscribe(([response]: Array<any>) => {
        if (this.roleId) {
        let {roleId, type, etat} = response.data;      
        this.form.setValue({ roleId, type, etat});

      }
    });


  }
  public save() {
    const role: Role = this.form.value;
    console.log(role.type)
    this.toastr.success
    this.roleService.save(role).subscribe((response: any) => {
      this.toastr.success("Votre role a été sauvegardée avec succés !", "Très bien !", { positionClass: "toast-center-center" });
      
        setTimeout(() => {
          this.router.navigate(["pages/roles"], { replaceUrl: true });
        });
      
    });
  }

  public goBack() {
    this.router.navigate(["pages/roles"]);
  }

}
