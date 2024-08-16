import { Expose } from "class-transformer";

export default class MotherMeterWaterModel {
    @Expose({ name: "id" })
    id: number;

    @Expose({ name: "serial_number" })
    serialNumber: number;


    @Expose({ name: "created_at" })
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


