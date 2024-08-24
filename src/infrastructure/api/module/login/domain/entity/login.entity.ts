import { Expose } from "class-transformer";
import {
    IsEmail,
    IsNotEmpty,
    IsString,
} from "class-validator";

export default class LoginEntity {
    @Expose()
    @IsString()
    @IsNotEmpty()
    public accountCode: string;

    @Expose()
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @Expose()
    // @IsStrongPassword()
    @IsNotEmpty()
    public password: string;

    constructor(accountCode: string, email: string, password: string) {
        this.accountCode = accountCode;
        this.email = email;
        this.password = password;
    }
}
