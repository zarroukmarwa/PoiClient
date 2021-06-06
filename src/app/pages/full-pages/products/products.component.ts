import { Component, OnInit } from '@angular/core';
import { Product } from "../../../entities/product";
import { ProductService } from "../../../services/product.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: Product[] = [];
  public count: number = 0;
  public pagesCount: number = 0;
  public pageSize: number = 5;


  constructor(private router: Router , private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.findAndCount({}).subscribe((response: any) => {
      this.products = response.data.records;
      this.count = response.data.count;
      this.pagesCount = Math.ceil(this.count / this.pageSize);
    });
  }

  public addProduct(): void {
    this.router.navigate(["pages/product"]);
  }

  public editProduct(id: number): void {
    this.router.navigate(["pages/product", id]);
  }

  public removeProduct(id: number): void {
  }

}
