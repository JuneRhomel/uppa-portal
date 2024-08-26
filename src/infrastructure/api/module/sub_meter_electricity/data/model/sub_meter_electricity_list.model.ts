import { Expose } from "class-transformer";
import SubMeterElectricityModel from "./sub_meter_electricity.model";


export default class SubMeterElectricityListModel {
    @Expose()
    public subMeterElectricities: SubMeterElectricityModel[];

    @Expose()
    public totalRows: number;

    constructor(subMeterElectricities: SubMeterElectricityModel[], totalRows: number) {
        this.subMeterElectricities = subMeterElectricities;
        this.totalRows = totalRows;
    }
}
