import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../../model/product.model';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule,],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.getProductById(params['id']));
    // this.activatedRoute.params.subscribe(params => this.getProductRecommendation(params['id']));
  }

  product: Product = {} as Product

  getProductById(id: number) {
    this.getProductRecommendation(id);
    this.productService.getProductById(id).subscribe(
      (response: any) => {
        this.product = response
      }
    )
  }

  productRecommendations: Product[] = []

  getProductRecommendation(id: number) {
    this.productService.getProductsRecommendations(id).subscribe(
      (response: any) => {
        this.productRecommendations = response
      }
    )
  }

  size: string = "";
  quantity: number = 1;
  productId: number = 0;
  // selectedSize(productId: number, size: string) {
  //   this.size = size;
  //   this.productId = productId
  // }

  selectedSize: string = "";

  selectSize(size: string) {
    this.selectedSize = size;
    console.log(this.selectedSize);

  }

  addToCartItem(product: Product) {
    if (product.id !== 0 && this.selectedSize !== "") {
      console.log(product.id, this.size);
      this.cartService.addToCart(product, this.quantity, this.selectedSize);
      this.showSuccessAddToCart()
      this.resetSelectedSize()
      this.reloadCurrentRoute()
    } else {
      this.showErroNoSelectedSize()
    }
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  resetSelectedSize() {
    this.productId = 0;
    this.size = ""
  }

  showSuccessAddToCart() {
    this.toastrService.success('Product added to cart', 'Larana', { positionClass: 'toast-bottom-left', });
  }

  showErroNoSelectedSize() {
    this.toastrService.success('Please select a size', 'Larana', { positionClass: 'toast-bottom-left', });
  }





}
