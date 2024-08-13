import { Expose } from "class-transformer";
import { IsNumber, isNumber, IsOptional, IsString } from "class-validator";

export default class MotherMeterWaterEntity {
    @Expose()
    @IsNumber()
    @IsOptional()
    id: number | undefined;

    @Expose()
    @IsString()
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


