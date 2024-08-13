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
    public status_id: number | undefined;

    @Expose({ name: 'contact_number' })
    public contact_number: string;

    @Expose({ name: 'email' })
    public email: string;


    constructor(
        id: number,
        first_name: string,
        last_name: string,
        email: string,
        status: string,
        status_id: number | undefined,
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