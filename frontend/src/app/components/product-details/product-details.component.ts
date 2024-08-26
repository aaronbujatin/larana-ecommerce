import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product.model';


export interface ProductSize {

  stock: number;
  size: string;

}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute
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
        console.log(this.product);
      }
    )
  }

  productRecommendations: Product[]=[]

  getProductRecommendation(id:number){
    this.productService.getProductsRecommendations(id).subscribe(
      (response: any) => {
        this.productRecommendations = response
        console.log(this.productRecommendations);
      }
    )
  }



}
