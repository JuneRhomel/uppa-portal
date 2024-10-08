import HttpCliestUtilParams from "./interface/http_cliest_util.params";
import ApiConstant from "../../application/constant/api.constant";
import Failure from "../../application/failure/failure";
import TimeoutFailure from "../../application/failure/timeout.failure";
import FailureMapperUtil from "../failure_mapper/failure_mapper.util";

export default async function HttpCliestUtil(params: HttpCliestUtilParams) {
    const { url, method, body } = params;

    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json'
    };

    if (url !== '/auth') {
        headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    }

    const response = await fetch(`${ApiConstant.BASE_URL}${url}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 403) {
        localStorage.removeItem('token');
        return new TimeoutFailure()
    }

    if (response.status === 401) {
        location.href = '/login';
        localStorage.removeItem('token');
        return
    }
    const data = await response.json();

    if (url === '/auth' && data.token) {
        localStorage.setItem('token', data.token);
    }

    if (response.status >= 400) {
        return FailureMapperUtil(data);
    }
    return data;
}
