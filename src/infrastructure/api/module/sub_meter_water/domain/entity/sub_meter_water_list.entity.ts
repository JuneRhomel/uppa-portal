import { Expose } from "class-transformer";
import SubMeterWaterEntity from "./sub_meter_water.entity";


export default class SubMeterWaterListEntity {
    @Expose()
    public subMeterWaters: SubMeterWaterEntity[];

    @Expose()
    public totalRows: number;

    constructor(subMeterWaters: SubMeterWaterEntity[], totalRows: number) {
        this.subMeterWaters = subMeterWaters;
        this.totalRows = totalRows;
    }
}
