export default interface HttpCliestUtilParams {
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    body?: object | Object[]
}