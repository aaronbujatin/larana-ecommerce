import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute){}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.getProductsByCategories(params['category']));
  }

  products : Product[] = []
  categoryHeader : string | undefined
  getProductsByCategories(category: string){
    this.categoryHeader = category;
    this.productService.getProductsByCategories(category).subscribe(
      (response: any) => {
        this.products = response
        console.log(response);
      }, (error) => {
        console.log(error);
        
      }
    )
  }

}
