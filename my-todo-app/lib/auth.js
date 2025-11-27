export function getAuthToken() {
    return localStorage.getItem('authToken');
}

export function setAuthToken(token) {
    localStorage.setItem('authToken', token);
}

export function clearAuthToken() {
    localStorage.removeItem('authToken');
}

export function getTokenFromStorage() {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('auth_token')
}
