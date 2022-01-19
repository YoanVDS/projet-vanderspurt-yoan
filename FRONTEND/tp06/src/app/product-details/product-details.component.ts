import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddProduct } from '../basket.action';
import { Product } from '../product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product: Product;
  constructor(private store: Store) { }

  ngOnInit() {
  }

  addProduct() { this.store.dispatch(new AddProduct(this.product)); }; 

}
