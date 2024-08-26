import { Expose } from "class-transformer";

export default class SubMeterWaterModel {
    @Expose()
    id: number | undefined;

    @Expose()
    serialNumber: string;

    @Expose()
    motherMeterId: number | undefined;

    @Expose()
    motherMeterSerialNumber: string | undefined;

    @Expose()
    unitId: number | undefined;

    @Expose()
    unitName: string | undefined;


    @Expose()
    createdAt: Date | null;


    constructor(
        id: number | undefined,
        serialNumber: string,
        motherMeterId: number | undefined,
        motherMeterSerialNumber: string | undefined,
        unitId: number | undefined,
        unitName: string | undefined,
        createdAt: Date | null

    ) {
        this.id = id;
        this.serialNumber = serialNumber;
        this.motherMeterId = motherMeterId;
        this.motherMeterSerialNumber = motherMeterSerialNumber;
        this.unitId = unitId;
        this.unitName = unitName;
        this.createdAt = createdAt;
    }
}


