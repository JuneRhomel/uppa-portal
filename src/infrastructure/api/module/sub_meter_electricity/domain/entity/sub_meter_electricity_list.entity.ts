import { Expose } from "class-transformer";
import SubMeterElectricityEntity from "./sub_meter_electricity.entity";


export default class SubMeterElectricityListEntity {
    @Expose()
    public subMeterElectricities: SubMeterElectricityEntity[];

    @Expose()
    public totalRows: number;

    constructor(subMeterElectricities: SubMeterElectricityEntity[], totalRows: number) {
        this.subMeterElectricities = subMeterElectricities;
        this.totalRows = totalRows;
    }
}
