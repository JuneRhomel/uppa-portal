import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";

export default class PropertiesModel {
    @Expose()
    @IsNumber()
    id: number;

    @Expose()
    unit_name: string;

    @Expose()
    @IsNumber()
    unit_type_id: number;
    
    @Expose()
    unit_type_name: string;
    
    @Expose()
    @IsNumber()
    unit_status_id: number;

    @Expose()
    unit_status_name: string;


    constructor(
        id: number,
        unit_name: string,
        unit_type_id: number,
        unit_type_name: string,
        unit_status_id: number,
        unit_status_name: string,

    ) {
        this.id = id;
        this.unit_name = unit_name;
        this.unit_type_id = unit_type_id;
        this.unit_type_name = unit_type_name;
        this.unit_status_id = unit_status_id;
        this.unit_status_name = unit_status_name;

    }
}
