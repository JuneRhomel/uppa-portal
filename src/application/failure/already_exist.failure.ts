import Failure from "./failure";

export default class AlreadyExistFailure extends Failure {
    constructor() {
        super({
            code: 2002,
            message: "Already Exist Failure",
        });
    }
}
