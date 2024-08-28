import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../../model/cart-item.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService,
    private toastService: ToastrService,
    private router: Router
  ) { }

  cartItems: CartItem[] = []
  cartKey: string = 'cart'

  ngOnInit(): void {
    const storedCartItems = localStorage.getItem(this.cartKey);
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }

  incrementQuantity(productId: number, size: string) {
    this.cartService.incrementQuantity(productId, size);
    this.reloadCurrentRoute();
  }

  decrementQuantity(productId: number, size: string) {
    this.cartService.decrementQuantity(productId, size);
    this.reloadCurrentRoute();
  }

  removeProductFromCart(productId: number) {
    this.cartService.removeProductInCartItem(productId);
    this.reloadCurrentRoute();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  isCartEmpty() {
    if (this.cartItems.length === 0) {
      return true;
    }
    return false;
  }


  getTotalPrice() {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.quantity * item.price
    }
    return totalPrice;
  }



}
