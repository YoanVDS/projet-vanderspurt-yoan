import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Address } from '../address';
import { AddAddress, RemoveAddress, SetBillingAddress, SetPostalAddress } from '../user.action';
import { UserState } from '../user.state';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  @Select(UserState.GetLoggedUserAddresses) addresses$: Observable<Address[]>;
  @Select(UserState.GetLoggedUserPostalAddress) postalAddress$: Observable<Address>;
  @Select(UserState.GetLoggedUserBillingAddress) billingAddress$: Observable<Address>;
  newAddress: Boolean = false;
  address: string;
  zip: string;
  city: string;
  country: string;
  constructor(private store: Store) { }

  ngOnInit() {
  }

  setPostalAddress(address: Address): void {
    this.store.dispatch(new SetPostalAddress(address));
  }

  setBillingAddress(address: Address): void {
    this.store.dispatch(new SetBillingAddress(address));
  }

  addAddress(): void{
    var address = new Address(this.address,this.city,this.zip,this.country)
    this.store.dispatch(new AddAddress(address));
  }

  removeAddress(address: Address): void{
    this.store.dispatch(new RemoveAddress(address));
  }
}
