import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BasketState } from '../basket.state';

@Component({
  selector: 'app-basket-header',
  templateUrl: './basket-header.component.html',
  styleUrls: ['./basket-header.component.css']
})
export class BasketHeaderComponent implements OnInit {

  constructor() { }

  @Select(BasketState.GetNbProducts) nb$: Observable<number>;
  
  ngOnInit() {
  }

}
