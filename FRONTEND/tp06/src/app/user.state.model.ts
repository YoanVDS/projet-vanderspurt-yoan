import { Address } from "./address"

export class UserStateModel{
    users: User[];
    loggedUser: User;
}

export class User{
    constructor(
        public nickname: string,
        public password: string,
        public addresses: Address[],
        public postalAddress: Address,
        public billingAddress: Address,
        public email:string,
        public gender: string,
        public firstName: string,
        public lastName: string,
        public phoneNumber: string,
        public bddId: number
    ){};
}