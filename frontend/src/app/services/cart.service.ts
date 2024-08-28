import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item.model';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/product.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private toastService: ToastrService) {
    this.cartItems = this.getCartItems();
    this.cartItemSubject.next(this.cartItems.length);

  }

  private cartItems: CartItem[] = [];
  private cartItemSubject = new BehaviorSubject<number>(0);
  private cartKey = 'cart';

  public addToCart(product: Product, quantity: number, size: string) {
    const existingCartItem = this.cartItems.findIndex(cartItem => cartItem.productId === product.id && cartItem.size === size);
    if (existingCartItem !== -1) {
      this.cartItems[existingCartItem].quantity += quantity;
      localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    } else {
      const productSize = product.productSizes.find(productSize => productSize.size === size);
      console.log(productSize);

      if (productSize) {
        const cartItem = {
          quantity: quantity,
          productId: product.id,
          productName: product.name,
          imageUrl: product.imageUrl[0],
          size: size,
          price: product.price,
          maxStock: productSize.stock

        }
        this.cartItems.push(cartItem);
        this.cartItemSubject.next(this.cartItems.length);
        localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
      }
    }
  }

 

  public getCartItems() {
    const cartItems = localStorage.getItem(this.cartKey);
    return cartItems ? JSON.parse(cartItems) : [];
  }

  public getCartItemSize() {
    return this.cartItemSubject.asObservable();
  }

  public removeProductInCartItem(productId: number) {
    const cartIndex = this.cartItems.findIndex(cartItem => cartItem.productId === productId);
    if (cartIndex !== -1) {
      this.cartItems.splice(cartIndex, 1);
      this.cartItemSubject.next(this.cartItems.length);
      localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    }
  }

  public incrementQuantity(productId: number, size: string) {
    const productIndex = this.cartItems.findIndex(cartItem => cartItem.productId === productId && cartItem.size === size);
    if (productIndex !== -1) {
      this.cartItems[productIndex].quantity += 1;
      localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    }
  }

  public decrementQuantity(productId: number, size: string) {
    const productIndex = this.cartItems.findIndex(cartItem => cartItem.productId === productId && cartItem.size === size);
    if (productIndex !== -1) {
      this.cartItems[productIndex].quantity -= 1;
      localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    }
  }



}
