import HttpClientException from "../../../../../application/exception/http_client.exception";
import FailureMapperUtil from "../../../../../util/failure_mapper/failure_mapper.util";
import InactiveAccountFailure from "../../../domain/failure/inactive_account.failure";
import LockedAccountFailure from "../../../domain/failure/locked_account.failure";
import LoginFailure from "../../../domain/failure/login.failure";
export default function LoginFailureMapper(exception: any) {

  if (
    exception instanceof HttpClientException &&
    exception.body.code === 2001
  ) {
    return new LoginFailure();
  }

  if (
    exception instanceof HttpClientException &&
    exception.body.code === 2002
  ) {
    return new InactiveAccountFailure();
  }

  if (
    exception instanceof HttpClientException &&
    exception.body.code === 2003
  ) {
    return new LockedAccountFailure();
  }

  return FailureMapperUtil(exception);
}
