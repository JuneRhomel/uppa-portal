import { Expose } from "class-transformer";

export default class TenantModel {
    @Expose({ name: 'id' })
    public id: number;

    @Expose({ name: 'first_name' })
    public first_name: string;

    @Expose({ name: 'last_name' })
    public last_name: string;

    @Expose({ name: 'status' })
    public status: string;

    @Expose({ name: 'status_id' })
    public status_id: number;

    @Expose({ name: 'contact_number' })
    public contact_number: string;

    @Expose({ name: 'email' })
    public email: string;

    @Expose({ name: 'created_at' })
    public created_at: Date;

    @Expose({ name: 'updated_at' })
    public updated_at: Date;

    @Expose({ name: 'created_by' })
    public created_by: number;

    @Expose({ name: 'updated_by' })
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