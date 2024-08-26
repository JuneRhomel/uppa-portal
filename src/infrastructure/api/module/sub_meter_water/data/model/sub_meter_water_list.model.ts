import { Expose } from "class-transformer";
import SubMeterWaterModel from "./sub_meter_water.model";


export default class SubMeterWaterListModel {
    @Expose()
    public subMeterWaters: SubMeterWaterModel[];

    @Expose()
    public totalRows: number;

    constructor(subMeterWaters: SubMeterWaterModel[], totalRows: number) {
        this.subMeterWaters = subMeterWaters;
        this.totalRows = totalRows;
    }
}
