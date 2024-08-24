import { Expose } from "class-transformer";

export default class MotherMeterWaterModel {
    @Expose()
    id: number;

    @Expose()
    serialNumber: string;


    @Expose()
    createdAt: Date | undefined;

    constructor(
        id: number,
        serialNumber: string,
        createdAt: Date | undefined
    ) {
        this.id = id;
        this.serialNumber = serialNumber;
        this.createdAt = createdAt;
    }
}


