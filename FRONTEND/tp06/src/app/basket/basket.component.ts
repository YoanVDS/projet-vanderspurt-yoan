import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RemoveProduct } from '../basket.action';
import { BasketState } from '../basket.state';
import { Product } from '../product';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {
  }

  @Select(BasketState.GetProducts) basketProducts$: Observable<Array<Product>>;

  removeProduct(product: Product) { this.store.dispatch(new RemoveProduct(product)); }; 
}
