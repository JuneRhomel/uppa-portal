import { Expose } from "class-transformer";

export default class MotherMeterElectricityModel {
    @Expose()
    id: number;

    @Expose()
    serialNumber: number;


    @Expose()
    createdAt: Date | undefined;

    constructor(
        id: number,
        serialNumber: number,
        createdAt: Date | undefined
    ) {
        this.id = id;
        this.serialNumber = serialNumber;
        this.createdAt = createdAt;
    }
}


