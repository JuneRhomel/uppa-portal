export default class Failure {
    public code: number;
  
    public message: string;
  
    public extra: any | undefined;
  
    constructor({
      code,
      message,
      extra,
    }: {
      code: number;
      message: string;
      extra?: any | undefined;
    }) {
      this.code = code;
      this.message = message;
      this.extra = extra;
    }
  }
  