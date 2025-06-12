import { constRoutes } from "@/constants/routes/routes";

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export async function apiClient<T = any>(
    url: string,
    method: Method,
    body?: any
): Promise<T> {
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