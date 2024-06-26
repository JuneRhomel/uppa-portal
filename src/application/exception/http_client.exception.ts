import Exception from "./exception";

export default class HttpClientException extends Exception {
  public statusCode: number;

  public body: {
    code: number;
    message: string;
    extra?: any[] | undefined;
  };

  public header: object;

  constructor(
    statusCode: number,
    body: {
      code: number;
      message: string;
      extra?: any[] | undefined;
    },
    header: object
  ) {
    super();

    this.statusCode = statusCode;
    this.body = body;
    this.header = header;
  }
}
