import Failure from "./failure";

export default class ValidationFailure extends Failure {
  public errors: {
    property: string;
    value: any;
    constraints: object;
  }[];

  constructor(errors: { property: string; value: any; constraints: object }[]) {
    super({
      code: 400,
      message: "Validation Failure",
    })
    this.errors = errors;
  }
}
