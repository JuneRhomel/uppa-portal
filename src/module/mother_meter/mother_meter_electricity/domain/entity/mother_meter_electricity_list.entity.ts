import { Expose } from "class-transformer";
import MotherMeterElectricityEntity from "./mother_meter_electricity.entity";
import { IsNumber } from "class-validator";


export default class MotherMeterElectricityListEntity {
    @Expose()
    @IsNumber()
    public totalRows: number;

    @Expose()
    public motherMeterElectricityEntity: MotherMeterElectricityEntity[];

    constructor(motherMeterElectricityEntity: MotherMeterElectricityEntity[], totalRows: number) {
        this.motherMeterElectricityEntity = motherMeterElectricityEntity;
        this.totalRows = totalRows;
    }
}
