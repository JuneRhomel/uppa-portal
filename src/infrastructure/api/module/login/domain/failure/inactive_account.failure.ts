import Failure from "../../../../../../application/failure/failure";


export default class InactiveAccountFailure extends Failure {

    constructor() {
        super({
            code: 2002,
            message: "Inactive Account",
        });
    }
}
