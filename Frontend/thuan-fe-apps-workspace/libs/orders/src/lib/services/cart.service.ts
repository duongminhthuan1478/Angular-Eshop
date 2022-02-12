import { CartItem, Cart } from './../models/cart.model';
import { environment } from '@thuan-env/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCartFromLS());
  constructor() { }

  initLocalStorage() {
    const cart = this.getCartFromLS();
    if(!cart) {
      const initalCart = { items: [] }
      this.setCartToLS(initalCart);
      return;
    }
  }

  setCartItem(cartItem: CartItem, isUpdate = false) {
    const cart = this.getCartFromLS();
    const cartItemExist = cart.items.find(item => item.productId === cartItem.productId);
    if(cartItemExist) {
      cartItemExist.quantity = isUpdate ? cartItem.quantity : cartItemExist.quantity + cartItem.quantity;
    } else {
      cart.items.push(cartItem);
    }
    this.setCartToLS(cart);
    this.cart$.next(cart);
  }

  getCartFromLS(): Cart {
    return JSON.parse(localStorage.getItem(environment.LS.CART) as string);
  }

  setCartToLS(cart: Cart) {
    localStorage.setItem(environment.LS.CART, JSON.stringify(cart));
  }

  deleteCartItem(productId: string) {
    const cart = this.getCartFromLS();
    cart.items = cart.items.filter(item => item.productId !== productId);
    this.setCartToLS(cart);
    this.cart$.next(cart);
  }

  clearCart() {
    const initalCart = { items: [] }
    this.setCartToLS(initalCart);
    this.cart$.next(initalCart);
  }

}
