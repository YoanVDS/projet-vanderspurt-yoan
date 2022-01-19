import { Address } from "./address"
import { Product } from "./product";
import { User } from "./user.state.model"

export class AddAddress{
    static readonly type = '[Address] Add';

    constructor(public payload: Address ){}

}

export class RemoveAddress{
    static readonly type = '[Address] Remove';

    constructor(public payload: Address){}
}

export class AddUser{
    static readonly type = '[User] Add';

    constructor(public payload: User){}
}

export class RemoveUser{
    static readonly type = '[User] Remove';

    constructor(public payload: User){}
}

export class SetLoggedUser{
    static readonly type = '[Current User] Log';

    constructor(public payload: User){}
}

export class SetPostalAddress{
    static readonly type = '[Postal Address] Set';

    constructor(public payload: Address){}
}

export class SetBillingAddress{
    static readonly type = '[Billing Address] Set';

    constructor(public payload: Address){}
}