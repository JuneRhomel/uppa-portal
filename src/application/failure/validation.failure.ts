import Failure from "./failure";

export default class ValidationFailure extends Failure {
  public errors: {
    property: string;
    value: any;
    constraints: object;
  }[];

  constructor(errors: { property: string; value: any; constraints: object }[]) {
    super();

    this.errors = errors;
  }
}
