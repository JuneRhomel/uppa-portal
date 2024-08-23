import { Expose } from "class-transformer";


export default class PropertyStatusModel {
    @Expose()
    id: number;
    @Expose()
    unit_status_name: string;


    constructor(
        id: number,
        unit_status_name: string,

    ) {
        this.id = id;
        this.unit_status_name = unit_status_name;

    }
}