import PropertiesModel from "./properties.model";
import { Expose } from "class-transformer";
export default class ListPropertiesModel {
  @Expose()
  public properties: PropertiesModel[];

  @Expose()
  public totalRows: number;

  constructor(properties: PropertiesModel[], totalRows: number) {
    this.properties = properties;
    this.totalRows = totalRows;
  }
}
