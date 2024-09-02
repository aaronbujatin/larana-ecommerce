import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../../model/cart-item.model';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

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

  shippingFee : number = 150;

  getTotalPrice() {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.quantity * item.price
    }
    return totalPrice;
  }

}
