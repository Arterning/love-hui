export class ApiError extends Error {
    constructor(url: string, status: number) {
        super(`'${url}' returned ${status}`);
        this.name = 'ApiError';
    }
}

export async function fetchJson(url: string, options?: any) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new ApiError(url, response.status);
    }
    return await response.json();
}