import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.cartService.getCartItemSize().subscribe(size => {
      this.cartItemSize = size;
    })
  }


  nikeCategories : string[] = [
    "Air Force",
    "Air Max",
    "Dunks",
    "Nike Basketball",
    "Jordan"
  ]

  adidasCategories : string[] = [
    "Samba",
    "Gazelle",
    "Stan Smith",
    "Spezial",
    "Superstar",
  ]

  cartItemSize: number = 0;

 
  

}
