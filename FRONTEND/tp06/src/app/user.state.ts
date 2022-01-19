import { isNgTemplate } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, StateStream, Store } from "@ngxs/store"
import { AddAddress, RemoveAddress,  AddUser, RemoveUser, SetLoggedUser, SetPostalAddress, SetBillingAddress} from "./user.action"
import { UserStateModel, User } from "./user.state.model"

@State<UserStateModel>({
    name: 'users',
    defaults: {
        users: [],
        loggedUser: null
    }
})

@Injectable()
export class UserState{
    @Selector()
    static GetUsers(state: UserStateModel){
        return state.users;
    }

    @Selector()
    static GetNbUsers(state: UserStateModel) {
        return state.users.length;
    }

    @Selector()
    static GetUser(state: UserStateModel, nickname: string, password: string){
        state.users.forEach(element => {
            if(element.nickname == nickname && element.password == password) return element;
        });
    }

    @Selector()
    static GetLoggedUser(state: UserStateModel){
        return state.loggedUser;
    }

    @Selector()
    static GetLoggedUserAddresses(state: UserStateModel){
        return state.loggedUser.addresses;
    }

    @Selector()
    static GetLoggedUserPostalAddress(state: UserStateModel){
        return state.loggedUser.postalAddress;
    }

    @Selector()
    static GetLoggedUserBillingAddress(state: UserStateModel){
        return state.loggedUser.billingAddress;
    }



    @Selector()
    static GetLoggedUserNick(state: UserStateModel){
        return state.loggedUser.nickname;
    }

    @Action(AddUser)
        addUser({getState, patchState}: StateContext<UserStateModel>, {payload} : AddUser){
            const state = getState();
            patchState({
                users: [...state.users, payload]
            });
        }

    @Action(AddAddress)
        addAddress({getState, patchState}: StateContext<UserStateModel>, {payload}: AddAddress){
            let state = getState();
            let user = state.loggedUser;
            user.addresses.push(payload);
            patchState({
                loggedUser: user
            })
        }

    @Action(RemoveAddress)
        removeAddress({getState, patchState}: StateContext<UserStateModel>, {payload}: AddAddress){
            let state = getState();
            let user = state.loggedUser;
            user.addresses = user.addresses.filter(item =>
                item.address != payload.address
            &&  item.city != payload.city
            &&  item.country != payload.country
            &&  item.zip != payload.zip);
            if(user.billingAddress &&user.billingAddress.address == payload.address
                && user.billingAddress.city == payload.city
                && user.billingAddress.zip == payload.zip
                && user.billingAddress.country == payload.country){
                    user.billingAddress = null;
                }
            if(user.postalAddress && user.postalAddress.address == payload.address
                    && user.postalAddress.city == payload.city
                    && user.postalAddress.zip == payload.zip
                    && user.postalAddress.country == payload.country){
                    user.postalAddress = null;
                }
                           
            patchState({
                loggedUser: user
            })
        }

    @Action(RemoveUser)
        removeUser({getState, patchState}: StateContext<UserStateModel>, {payload}: RemoveUser){
            const state = getState();
            patchState({
                users: state.users.filter(
                    item => item.nickname != payload.nickname
                )
            })
        }

    @Action(SetLoggedUser)
        setLoggedUser({getState, patchState}: StateContext<UserStateModel>, {payload}: SetLoggedUser){
            patchState({
                loggedUser: payload
            })
        }

    @Action(SetPostalAddress)
        setPostalAddress({getState, patchState}: StateContext<UserStateModel>, {payload}:SetPostalAddress){
            let state = getState();
            let user = state.loggedUser;
            user.postalAddress = payload;
            patchState({
                loggedUser: user
            })
        }

    @Action(SetBillingAddress)
        setBillingAddress({getState, patchState}: StateContext<UserStateModel>, {payload}: SetBillingAddress){
            let state = getState();
            let user = state.loggedUser;
            user.billingAddress = payload;
            patchState({
                loggedUser: user
            })
        }
}