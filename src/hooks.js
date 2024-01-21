import * as cookie from 'cookie';

export function getSession(request) {
    const cookies = cookie.parse(request.headers.cookie || '');
    return JSON.parse(cookies.session || '{}');
}