import { Expose } from "class-transformer";
import MotherMeterWaterModel from "./mother_meter_water.model";
import { IsNumber } from "class-validator";


export default class MotherMeterWaterListModel {
    @Expose()
    public totalRows: number;

    @Expose({ name: "MotherMeterWaterEntity" })
    public motherMeterWaterModel: MotherMeterWaterModel[];

    constructor(motherMeterWaterModel: MotherMeterWaterModel[], totalRows: number) {
        this.motherMeterWaterModel = motherMeterWaterModel;
        this.totalRows = totalRows;
    }
}