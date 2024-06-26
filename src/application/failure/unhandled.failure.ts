import Failure from "./failure";

export default class UnhandledFailure extends Failure {
    constructor() {
        super({
            code: 500,
            message: "Unhandled Exception",
        });
    }
}
