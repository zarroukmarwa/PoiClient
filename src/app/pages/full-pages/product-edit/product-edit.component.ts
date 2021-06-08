import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../entities/product';
import { ProductService } from 'app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable, of } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private productService: ProductService,
    private router: Router) {
    this.route.params.subscribe((params) => {
      this.id = params.id ? parseInt(params.id) : undefined;
    })
  }

  public id?: number;
  public form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(this.id),
      label: new FormControl("", Validators.required),
      price: new FormControl("", Validators.required),
      description: new FormControl(""),
    });
   
    const calls: Observable<any>[] = [];
    this.id && calls.push(this.productService.findById(this.id));
      forkJoin(calls).subscribe(([response]: Array<any>) => {
        if (this.id) {
        let {id, label, price, description} = response.data;      
        this.form.setValue({ id, label, price, description});

      }
    });


  }
  public save() {
    const product: Product = this.form.value;
    console.log(product.description)
    this.toastr.success
    this.productService.save(product).subscribe((response: any) => {
      this.toastr.success("Votre produit a été sauvegardée avec succés !", "Très bien !", { positionClass: "toast-top-center" });
      
        setTimeout(() => {
          this.router.navigate(["pages/products"], { replaceUrl: true });
        });
      
    });
  }

  public goBack() {
    this.router.navigate(["pages/products"]);
  }

}
