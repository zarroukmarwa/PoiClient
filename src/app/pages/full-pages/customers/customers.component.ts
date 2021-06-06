import { Component, OnInit } from '@angular/core';
import {Campaign} from '../../../entities/campaign';

import { Customer } from "../../../entities/customer";
import { CustomerService } from "../../../services/customer.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  public customers: Customer[] = [];
  public count: number = 0;
  public pagesCount: number = 0;
  public pageSize: number = 5;


  constructor(private router: Router , private customerService: CustomerService) {
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
