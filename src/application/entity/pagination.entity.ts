import { Expose } from "class-transformer";

export default class PaginationEntity {
  @Expose()
  public numberOfRows: number;

  @Expose()
  public search: string;

  @Expose()
  public page: number;


  @Expose()
  public columns: string;

  @Expose()
  public sortBy: string;

  @Expose()
  public sortOrder: "ASC" | "DESC" | "";

  @Expose()
  public filters: string;

  constructor(
    numberOfRows: number, 
    search: string, 
    page: number, 
    columns: string, 
    sortBy: string, 
    sortOrder: "ASC" | "DESC" | "",
    filters: string
  ) {
    this.numberOfRows = numberOfRows;
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
    this.search = search;
    this.page = page;
    this.columns = columns,
    this.filters = filters
  }
}
