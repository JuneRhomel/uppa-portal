import { Expose } from "class-transformer";

export default class TenantStatusModel {
    @Expose({ name: 'id' })
    public id: number;

    @Expose({ name: 'status_name' })
    public statusName: string;

    constructor(id: number, statusName: string) {
        this.id = id;
        this.statusName = statusName;
    }
}