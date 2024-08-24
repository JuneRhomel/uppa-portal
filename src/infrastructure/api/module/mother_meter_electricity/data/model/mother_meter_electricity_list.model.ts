import { Expose } from "class-transformer";
import MotherMeterElectricityModel from "./mother_meter_electricity.model";


export default class MotherMeterElectricityListModel {
    @Expose()
    public totalRows: number;

    @Expose({ name: "MotherMeterElectricityEntity" })
    public motherMeterElectricityModel: MotherMeterElectricityModel[];

    constructor(motherMeterElectricityModel: MotherMeterElectricityModel[], totalRows: number) {
        this.motherMeterElectricityModel = motherMeterElectricityModel;
        this.totalRows = totalRows;
    }
}