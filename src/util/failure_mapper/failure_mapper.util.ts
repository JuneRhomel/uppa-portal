import AuthException from "../../application/exception/auth.exception";
import HttpClientException from "../../application/exception/http_client.exception";
import HttpClientTimeoutException from "../../application/exception/http_client_timeout.exception";
import AuthFailure from "../../application/failure/auth.failure";
import TimeoutFailure from "../../application/failure/timeout.failure";
import UnhandledFailure from "../../application/failure/unhandled.failure";
import commonHttpClientFailureMapperHelper from "./helper/common_http_client_failure_mapper.helper";

export default function FailureMapperUtil(exception: any) {
  console.log(exception);
  if (exception instanceof HttpClientException) {
    return commonHttpClientFailureMapperHelper(exception);
  }

  if (exception instanceof HttpClientTimeoutException) {
    return new TimeoutFailure();
  }

  if (exception instanceof AuthException) {
    return new AuthFailure();
  }

  if (exception instanceof TimeoutFailure) {
    return new TimeoutFailure();
  }

  return new UnhandledFailure();
}
