import { IsNumber } from "class-validator";
import { Expose } from "class-transformer";
import TenantEntity from "./tenant.entity";

export default class TenantListEntity {
    @Expose()
    @IsNumber()
    public totalRows: number;

    @Expose()
    public tenants: TenantEntity[];

    constructor(properties: TenantEntity[], totalRows: number) {
        this.tenants = properties;
        this.totalRows = totalRows;
    }
}