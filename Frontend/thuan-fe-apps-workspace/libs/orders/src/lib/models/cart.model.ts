export class Cart {
  items!: CartItem[];
}

export class CartItem {
  productId!: string;
  quantity!: number;
}

export class CartItemDetail {
  product: any;
  quantity: number;
}
