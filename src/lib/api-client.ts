type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export async function apiClient<T = any>(
    url: string,
    method: Method,
    requestParams: Record<string, any> = {},
    body?: any
): Promise<T> {
    // Add query params for GET requests
    if (method === 'GET' && Object.keys(requestParams).length > 0) {
        const params = new URLSearchParams(requestParams).toString();
        url += (url.includes('?') ? '&' : '?') + params;
    }

    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        ...(body && method !== 'GET' && { body: JSON.stringify(body) }),
    }

    const res = await fetch(url, options)

    const text = await res.text()
    if (!res.ok) {
        if (res.status === 401 || text.includes('Unauthorized')) {
            document.cookie = 'userId=; Max-Age=0; path=/'
            window.location.href = '/login'
            return new Promise(() => { })
        }
        throw new Error(`Error ${res.status}: ${text}`)
    }
    return JSON.parse(text)
}