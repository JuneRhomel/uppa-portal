import { Expose } from "class-transformer";

export default class AuthCredentialsEntity {

    @Expose()
    public userId: string;
    @Expose()
    public email: string;
    @Expose()
    public accountCode: string;
    @Expose()
    public token: string;

    constructor(
        userId: string,
        email: string,
        accountCode: string,
        token: string

    ) {
        this.userId = userId;
        this.email = email;
        this.accountCode = accountCode;
        this.token = token;
    }

}
