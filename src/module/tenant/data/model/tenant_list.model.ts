import { IsNumber } from "class-validator";
import { Expose } from "class-transformer";
import TenantModel from "./tenant.model";

export default class TenantListModel {
    @Expose()
    @IsNumber()
    public totalRows: number;

    @Expose()
    public tenants: TenantModel[];

    constructor(properties: TenantModel[], totalRows: number) {
        this.tenants = properties;
        this.totalRows = totalRows;
    }
}