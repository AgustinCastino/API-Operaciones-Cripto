export class CryptoValidation extends Error{
    constructor(message){
        super(message)
        this.name = "CryptoValidation"
    }
}