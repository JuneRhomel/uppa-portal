import Failure from "./failure";

export default class TimeoutFailure extends Failure {
    constructor() {
        super({
            code: 500,
            message: "Request Timeout",
        });
    }
}
