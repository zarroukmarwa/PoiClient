import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from '../../../entities/action';
import { ActionService } from 'app/services/action.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable, of } from 'rxjs';

@Component({
  selector: 'app-action-edit',
  templateUrl: './action-edit.component.html',
  styleUrls: ['./action-edit.component.scss']
})
export class ActionEditComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private actionService: ActionService,
    private router: Router) {
    this.route.params.subscribe((params) => {
      this.actionId = params.id ? parseInt(params.id) : undefined;
    })
  }

  public actionId?: number;
  public form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      actionId: new FormControl(this.actionId),
      titre: new FormControl("", Validators.required),
      module: new FormControl("", Validators.required),
    });
   
    const calls: Observable<any>[] = [];
    this.actionId && calls.push(this.actionService.findById(this.actionId));
      forkJoin(calls).subscribe(([response]: Array<any>) => {
        if (this.actionId) {
        let {actionId, titre, module} = response.data;      
        this.form.setValue({actionId, titre, module});
      }
    });
  }

  
  public save() {
    const action: Action = this.form.value;
    console.log(action.titre)
    this.toastr.success
    this.actionService.save(action).subscribe((response: any) => {
      this.toastr.success("Votre action a été sauvegardée avec succés !", "Très bien !", { positionClass: "toast-center-center" });
      
        setTimeout(() => {
          this.router.navigate(["pages/actions"], { replaceUrl: true });
        });
      
    });
  }

  public goBack() {
    this.router.navigate(["pages/actions"]);
  }

}
