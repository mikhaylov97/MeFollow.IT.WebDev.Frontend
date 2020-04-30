export default function buildAuthHeader(accessToken) {
    // return authorization header with basic auth credentials
    if (accessToken) {
        return { 'Authorization': 'Bearer ' + accessToken };
    } else {
        return {};
    }
}
