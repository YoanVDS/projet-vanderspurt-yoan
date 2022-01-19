import { isNgTemplate } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store"
import { AddProduct, EmptyBasket, RemoveProduct } from "./basket.action"
import { BasketStateModel } from "./basket.state.model"

@State<BasketStateModel>({
    name: 'basket',
    defaults: {
    products: []
    }
})

@Injectable()
export class BasketState{
    @Selector()
    static GetProducts(state: BasketStateModel){
        return state.products;
    }

    @Selector()
    static GetNbProducts(state: BasketStateModel) {
        return state.products.length;
      }

    @Action(AddProduct)
        add({getState, patchState}: StateContext<BasketStateModel>, {payload} : AddProduct){
            const state = getState();
            patchState({
                products: [...state.products, payload]
            });
        }

    @Action(RemoveProduct)
        remove({getState, patchState}: StateContext<BasketStateModel>, {payload}: RemoveProduct){
            const state = getState();
            patchState({
                products: state.products.filter(
                    item => item.ref != payload.ref
                )
            })

        }

    @Action(EmptyBasket)
        empty({getState, patchState}: StateContext<BasketStateModel>){
            patchState({
                products: []
            })

        }
}