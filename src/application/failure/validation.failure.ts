import Failure from "./failure";

export default class ValidationFailure extends Failure {
  public extra: any[] | undefined;
  constructor(extra: any[]) {
    super({
      code: 400,
      message: "Validation Failure",
      extra: extra,
    });
  }
}
