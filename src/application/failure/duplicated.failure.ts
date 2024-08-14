import Failure from "./failure";

export default class DuplicatedFailure extends Failure {
    constructor(extra = "") {
        super({
            code: 200,
            message: "Duplicated Exception",
            extra: extra
        });
    }
}
