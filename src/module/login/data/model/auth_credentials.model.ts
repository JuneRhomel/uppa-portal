import { Expose } from "class-transformer";

export default class AuthCredentialsModel {
    @Expose()
    public success: boolean;

    @Expose()
    public data: {
        userId: string,
        email: string,
        accountCode: string,
        token: string
    };

    constructor(
        success: boolean,
        data: {
            userId: string,
            email: string,
            accountCode: string,
            token: string
        }
    ) {
        this.success = success;
        this.data = data;
    }

}
