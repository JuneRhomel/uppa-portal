import Failure from "../../../../application/failure/failure";

export default class LockedAccountFailure extends Failure {

    constructor() {
        super({
            code: 2003,
            message: "Locked Account",
        });
    }
}
