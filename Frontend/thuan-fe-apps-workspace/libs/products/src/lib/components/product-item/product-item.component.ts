import { Product } from './../../models/product.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html'
})
export class ProductItemComponent implements OnInit {
  @Input() product?: Product;
  constructor() { }

  ngOnInit(): void {
    console.log('product', this.product);
  }

}
