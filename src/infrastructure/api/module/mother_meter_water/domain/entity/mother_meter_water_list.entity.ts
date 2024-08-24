import { Expose } from "class-transformer";
import MotherMeterWaterEntity from "./mother_meter_water.entity";
import { IsNumber } from "class-validator";


export default class MotherMeterWaterListEntity {
    @Expose()
    @IsNumber()
    public totalRows: number;

    @Expose()
    public motherMeterWaterEntity: MotherMeterWaterEntity[];

    constructor(motherMeterWaterEntity: MotherMeterWaterEntity[], totalRows: number) {
        this.motherMeterWaterEntity = motherMeterWaterEntity;
        this.totalRows = totalRows;
    }
}