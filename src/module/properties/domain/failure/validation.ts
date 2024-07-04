import Failure from "../../../../application/failure/failure";

export default class ValidationFailure extends Failure {
    constructor({ extra }: { extra: any[] }) {
        super({
            code: 100,
            message: "ValidationFailure",
            extra,
        });
    }
}
