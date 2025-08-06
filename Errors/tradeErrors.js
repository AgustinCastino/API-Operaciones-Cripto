export class TradeValidation extends Error{
    constructor(message){
        super(message)
        this.name = "TradeValidation"
    }
}