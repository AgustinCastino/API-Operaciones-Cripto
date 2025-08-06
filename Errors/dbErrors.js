export class DbError extends Error{
    constructor(message){
        super(message)
        this.name = "DbErrors"
    }
}