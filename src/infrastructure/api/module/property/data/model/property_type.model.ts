import { Expose } from "class-transformer";


export default class PropertyTypeModel {
    @Expose()
    id: number;
    @Expose()
    unit_type_name: string;
    @Expose()
    created_at: Date;
    @Expose()
    updated_at: Date | null;
    @Expose()
    deleted_at: Date | null;
    @Expose()
    deleted_by: string | null;
    @Expose()
    updated_by: string | null;

    constructor(
        id: number,
        unit_type_name: string,
        created_at: Date,
        updated_at: Date | null = null,
        deleted_at: Date | null = null,
        deleted_by: string | null = null,
        updated_by: string | null = null
    ) {
        this.id = id;
        this.unit_type_name = unit_type_name;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
        this.deleted_by = deleted_by;
        this.updated_by = updated_by;
    }
}