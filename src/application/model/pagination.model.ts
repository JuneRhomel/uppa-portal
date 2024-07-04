import { Expose } from "class-transformer";

export default class PaginationModel {
  @Expose()
  public search: string;

  @Expose()
  public page: number;

  @Expose()
  public numberOfRows: number;

  @Expose()
  public columns: string;

  @Expose()
  public sortBy: string;

  @Expose()
  public sortOrder: "ASC" | "DESC" | "";

  @Expose()
  public filters: string;

  constructor(
    search: string, 
    page: number, 
    numberOfRows: number, 
    columns: string, 
    sortBy: string, 
    sortOrder: "ASC" | "DESC" | "",
    filters: string
  ) {
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
    this.search = search;
    this.page = page;
    this.numberOfRows = numberOfRows;
    this.columns = columns,
    this.filters = filters
  }
}
