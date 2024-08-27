import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item.model';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
    this.cartItems = this.getCartItems();
    this.cartItemSubject.next(this.cartItems.length);

  }

  private cartItems: CartItem[] = [];
  private cartItemSubject = new BehaviorSubject<number>(0);
  private cartKey = 'cart';

  public addToCart(product: Product, quantity: number, size: string) {
    const existingCartItem = this.cartItems.findIndex(cartItem => cartItem.productId === product.id && cartItem.size === size);
    if (!existingCartItem) {
      this.cartItems[existingCartItem].quantity += quantity;
      localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    } else {

      const cartItem = {
        quantity: quantity,
        productId: product.id,
        productName: product.name,
        imageUrl: product.imageUrl[0],
        size: size,
        price: product.price
      }
      this.cartItems.push(cartItem);
      this.cartItemSubject.next(this.cartItems.length);
      localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    }
  }

  public getCartItems() {
    const cartItems = localStorage.getItem(this.cartKey);
    return cartItems ? JSON.parse(cartItems) : [];
  }

  public getCartItemSize() {
    return this.cartItemSubject.asObservable();
  }



}
