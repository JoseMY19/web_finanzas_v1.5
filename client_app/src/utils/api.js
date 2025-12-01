export const getApiUrl = () => {
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001';
    return url.endsWith('/') ? url.slice(0, -1) : url;
};
