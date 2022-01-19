import { Product } from "./product"

export class AddProduct{
    static readonly type = '[Product] Add';

    constructor(public payload: Product){}

}

export class RemoveProduct{
    static readonly type = '[Product] Remove';

    constructor(public payload: Product){}

}

export class EmptyBasket{
    static readonly type = '[Basket] Empty';

    constructor(){}
}