import Failure from "./failure";

export default class UnknownAccountFailure extends Failure {

    constructor() {
        super({
            code: 2003,
            message: "Unknown Account",
        });
    }
}
