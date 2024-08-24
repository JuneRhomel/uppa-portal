import Failure from "../../../../../../application/failure/failure";

export default class LoginFailure extends Failure {

    constructor() {
        super({
            code: 2001,
            message: "Login Failure",
        });
    }
}
