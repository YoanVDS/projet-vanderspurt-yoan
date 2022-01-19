import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from './product'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  

  constructor(private httpClient: HttpClient) { }

  public getProducts(){
    return this.httpClient.get<Array<Product>>(environment.baseUrl);
  }
}
