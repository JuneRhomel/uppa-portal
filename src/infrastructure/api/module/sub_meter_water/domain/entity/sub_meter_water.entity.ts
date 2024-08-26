import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export default class SubMeterWaterEntity {
    @Expose()
    @IsOptional()
    @IsNumber()
    id: number | undefined;

    @Expose()
    @IsString()
    serialNumber: string;

    @Expose()
    @IsNumber()
    motherMeterId: number | undefined;

    @Expose()
    @IsString()
    @IsOptional()
    motherMeterSerialNumber: string | undefined;

    @Expose()
    @IsNumber()
    unitId: number | undefined;

    @Expose()
    @IsString()
    @IsOptional()
    unitName: string | undefined;


    @Expose()
    @IsOptional()
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


