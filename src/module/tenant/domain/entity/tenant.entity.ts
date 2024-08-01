import { Expose } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString, Length } from "class-validator";

export default class TenantEntity {
    @Expose()
    @IsOptional()
    @IsNumber()
    public id: number;

    @Expose()
    @IsString()
    @Length(3, 100)
    public first_name: string;

    @Expose()
    @IsString()
    @Length(3, 100)
    public last_name: string;

    @Expose()
    @IsString()
    @IsOptional()
    public status: string | undefined;

    @Expose()
    @IsNumber()
    @IsOptional()
    public status_id: number | undefined;

    @Expose()
    @IsString()
    @Length(11)
    public contact_number: string;

    @Expose()
    @IsString()
    @Length(3, 100)
    public email: string;



    constructor(
        id: number,
        first_name: string,
        last_name: string,
        email: string,
        status: string,
        status_id: number,
        contact_number: string,

    ) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.status = status;
        this.status_id = status_id;
        this.contact_number = contact_number;
    }
}