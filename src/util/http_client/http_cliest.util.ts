import HttpCliestUtilParams from "./interface/http_cliest_util.params";

export default async function HttpCliestUtil(params: HttpCliestUtilParams) {
    const { url, method, body } = params;

    const headers = {
        'Content-Type': 'application/json'
    } as any;

    if (url !== '/auth') {
        headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    } else {
        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });
        const data = await response.json();
        localStorage.setItem('token', data.token);
    }

    return fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    }).then(response => response.json());
}

