import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { Select, Store } from '@ngxs/store';
import { AddProduct, RemoveProduct } from '../basket.action';
import { BasketState } from '../basket.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  constructor(private store: Store) { }

  @Input() productsList$: Observable<Array<Product>>;
  detailedProduct: Product;


  ngOnInit() {
  }

  addProduct(product: Product) { this.store.dispatch(new AddProduct(product)); }; 

  seeDetails(product: Product) { this.detailedProduct = product; }
}
