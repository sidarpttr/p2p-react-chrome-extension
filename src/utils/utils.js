/**
 *
 * @param {string} token
 */
export function createFetchOrdersPayload(token) {
    return {
        headers: {
            accept: "application/json",
            authorization: "Bearer " + token,
        },
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
    };
}
