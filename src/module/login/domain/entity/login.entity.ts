import { Expose } from "class-transformer";
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    Length,
} from "class-validator";

export default class LoginEntity {
    @Expose()
    @IsString()
    @IsNotEmpty()
    public accountCode: string;

    @Expose()
    @IsEmail()
    @IsNotEmpty()
    @Length(0, 50)
    public email: string;

    @Expose()
    @IsStrongPassword()
    @IsNotEmpty()
    @Length(8, 20)
    public password: string;

    constructor(accountCode: string, email: string, password: string) {
        this.accountCode = accountCode;
        this.email = email;
        this.password = password;
    }
}
