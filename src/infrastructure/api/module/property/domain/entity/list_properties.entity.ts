import PropertiesEntity from "./properties.entity";
import { Expose } from "class-transformer";
export default class ListPropertiesEntity {
  @Expose()
  public properties: PropertiesEntity[];

  @Expose()
  public totalRows: number;

  constructor(properties: PropertiesEntity[], totalRows: number) {
    this.properties = properties;
    this.totalRows = totalRows;
  }
}
