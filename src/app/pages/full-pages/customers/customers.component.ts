import { Component, OnInit } from '@angular/core';
import {Campaign} from '../../../entities/campaign';

import { Customer } from "../../../entities/customer";
import { CustomerService } from "../../../services/customer.service";
import { Router } from "@angular/router";
import User from 'app/entities/user';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  public customers: Customer[] = [];
  public Users: Array<User>  = [];
  public count: number = 0;
  public pagesCount: number = 0;
  public pageSize: number = 5;
  public user: User ;

  constructor(private router: Router , private customerService: CustomerService, private userService: UserService) {
  }

  ngOnInit() {
    this.customerService.findAndCount({}).subscribe((response: any) => {
      this.customers = response.data.records;  
      this.count = response.data.count;
      this.pagesCount = Math.ceil(this.count / this.pageSize);
    });
  }

  public addCustomer(): void {
    this.router.navigate(["pages/customer"]);
  }

  public editCustomer(id: number): void {
    this.router.navigate(["pages/customer", id]);
  }

  public removeCustomer(id: number): void {
  }
}
