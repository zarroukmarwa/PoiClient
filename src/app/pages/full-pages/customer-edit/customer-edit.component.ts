import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'app/entities/customer';
import { CustomerService } from 'app/services/customer.service';
import { UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable } from 'rxjs';
import  User  from '../../../entities/user';
@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  public users: Array<User> = [];
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private customerService: CustomerService,
    private userservice: UserService,
    private router: Router) {
    this.route.params.subscribe((params) => {
      this.id = params.id ? parseInt(params.id) : undefined;
    })
  }

  public id?: number;
  public user: Array<User> = [];
  public form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(this.id),
      name: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      email: new FormControl("", Validators.email),
      adress: new FormControl("", Validators.required),
      user: new FormControl(),
    });
   


    const calls: Observable<any>[] = [
      this.userservice.findAll()
    ];
    this.id && calls.push(this.customerService.findById(this.id));
    forkJoin(calls).subscribe(([response1, response5]: Array<any>) => {
      this.users = response1.data;      
      if (this.id) {
        let { id, name,phone,adress,email,user} = response5.data;
        console.log("++++++++++++++++++++");
        console.log(response5.data)

        user = this.users.find(c => c.id === user.id);
        this.form.setValue({ id,name,phone,adress,email,user});
      }
    });
   

  }
  public save() {
    const customer: Customer = this.form.value;
    console.log(customer.name)
    this.toastr.success
    this.customerService.save(customer).subscribe((response: any) => {
      this.toastr.success("Votre client a été sauvegardée avec succés !", "Très bien !", { positionClass: "toast-top-center" });
      
        setTimeout(() => {
          this.router.navigate(["pages/customers"], { replaceUrl: true });
        });
      
    });
  }

  public goBack() {
    this.router.navigate(["pages/customers"]);
  }
}
