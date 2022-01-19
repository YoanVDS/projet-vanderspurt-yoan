export class Address {
    constructor(public address: string,
                public city: string, 
                public zip: string, 
                public country: string){}

    public toString(){
        return this.address + " " + this.zip + " " + this.city + " " + this.country;
    }
}