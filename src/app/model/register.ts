export class UserDet {
    constructor(public firstName: string, public lastName: string, public username: string, public password: string, public email: string) { }
}

export class LoginDet {
    constructor(public uname: string, public password: string) { }
}
