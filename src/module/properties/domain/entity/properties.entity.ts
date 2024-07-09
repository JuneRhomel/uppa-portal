import { Expose } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export default class PropertiesEntity {
  @Expose()
  @IsNumber()
  @IsOptional()
  id: number;

  @Expose()
  unit_name: string;

  @Expose()
  @IsNumber()
  unit_type_id: number;

  @Expose()
  @IsOptional()
  unit_type_name: string;

  @Expose()
  @IsNumber()
  unit_status_id: number;

  @Expose()
  @IsOptional()
  unit_status_name: string;
  
  @Expose()
  @IsOptional()
  created_at: Date | null;

  @Expose()
  @IsOptional()
  updated_at: Date | null;

  @Expose()
  @IsOptional()
  deleted_at: Date | null;

  @Expose()
  @IsOptional()
  created_by: number;
  
  @Expose()
  @IsOptional()
  deleted_by: number | null;

  @Expose()
  @IsOptional()
  updated_by: number | null;

  constructor(
    id: number,
    unit_name: string,
    unit_type_id: number,
    unit_type_name: string,
    unit_status_id: number,
    unit_status_name: string,
    created_at: Date | null,
    updated_at: Date | null,
    deleted_at: Date | null,
    created_by: number,
    deleted_by: number | null,
    updated_by: number | null
  ) {
    this.id = id;
    this.unit_name = unit_name;
    this.unit_type_id = unit_type_id;
    this.unit_type_name = unit_type_name;
    this.unit_status_id = unit_status_id;
    this.unit_status_name = unit_status_name;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.created_by = created_by;
    this.deleted_by = deleted_by;
    this.updated_by = updated_by;
  }
}
