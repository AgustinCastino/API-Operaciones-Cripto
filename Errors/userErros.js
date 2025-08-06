export class AuthError extends Error {
    constructor(message){
        super(message)
        this.name = "AuthError"
    }
}

export class RegisterError extends Error {
    constructor(message){
        super(message)
        this.name = "RegisterError"
    }
}

