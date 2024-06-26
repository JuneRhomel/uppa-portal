import { Expose } from "class-transformer";

export default class LoginModel {
    @Expose()
    public accountCode: string;

    @Expose()
    public email: string;

    @Expose()
    public password: string;

    constructor(
        accountCode: string,
        email: string,
        password: string
    ) {
        this.accountCode = accountCode;
        this.email = email;
        this.password = password;

    }
}
