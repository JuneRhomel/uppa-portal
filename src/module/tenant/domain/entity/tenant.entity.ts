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
    public status: string;

    @Expose()
    @IsNumber()
    public status_id: number;

    @Expose()
    @IsString()
    @Length(11)
    public contact_number: string;

    @Expose()
    @IsString()
    @Length(3, 100)
    public email: string;

    @Expose()
    @IsDate()
    public created_at: Date | undefined;

    @Expose()
    @IsDate()
    public updated_at: Date | undefined;

    @Expose()
    @IsNumber()
    public created_by: number;

    @Expose()
    @IsNumber()
    public updated_by: number;


    constructor(
        id: number,
        first_name: string,
        last_name: string,
        email: string,
        status: string,
        status_id: number,
        contact_number: string,
        created_at: Date,
        updated_at: Date,
        created_by: number,
        updated_by: number
    ) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.status = status;
        this.status_id = status_id;
        this.contact_number = contact_number;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.created_by = created_by;
        this.updated_by = updated_by;
    }
}