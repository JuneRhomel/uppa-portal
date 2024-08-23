import { IsNumber, IsString } from "class-validator";
import { Expose } from "class-transformer";

export default class TenantStatusEntity {
    @Expose()
    @IsNumber()
    public id: number;

    @Expose()
    @IsString()
    public statusName: string;

    constructor(id: number, statusName: string) {
        this.id = id;
        this.statusName = statusName;
    }
}