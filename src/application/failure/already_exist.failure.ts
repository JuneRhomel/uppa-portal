import Failure from "./failure";

export default class AlreadyExistFailure extends Failure {
    public extra: any[] | undefined;
    constructor(extra: any[]) {
        super({
            code: 400,
            message: "Validation Failure",
            extra: extra,
        });
    }
}
