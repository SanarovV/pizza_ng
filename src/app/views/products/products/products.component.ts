import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Subscription, tap} from "rxjs";
import {ProductService} from "../../../shared/services/product.service";
import {CartService} from "../../../shared/services/cart.service";
import {ProductType} from "../../../../types/product.type";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {


  constructor(private productService: ProductService,
              private cartService: CartService,
              private router: Router,
              private http: HttpClient) {
  }

  products: ProductType[] = [];
  loading: boolean = false;
  private subscriptionProducts: Subscription | null = null;

  ngOnInit(): void {
    // this.products = this.productService.getProducts();
    this.loading = true;
    this.subscriptionProducts = this.productService.getProducts()
      .pipe(
        tap( () => {
          this.loading = false
        })
      )
      // .pipe(
      //   tap((result) => { console.log(result) }),
      //   map((result) => (result.data)),
      //   // catchError((error) => { return of([]) }),
      //   retry(3)
      // )
      .subscribe(
        {
          next: (data) => {
            this.products = data;
            console.log('next')
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        }
      )
  }

  ngOnDestroy(): void {
    this.subscriptionProducts?.unsubscribe();
  }

  // addToCart(title: string): void {
  //   // использование общего сервиса
  //   this.cartService.product = title;
  //   // использование URL-параметров {queryParams: {product: title}}
  //   this.router.navigate(['/order'], {queryParams: {product: title}});
  // }
}
