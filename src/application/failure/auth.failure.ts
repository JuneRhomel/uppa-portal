import Failure from "./failure";

export default class AuthFailure extends Failure {
    constructor() {
        super({
            code: 2001,
            message: "Auth Failure",
        });
    }
}
