import { useAuth } from '@clerk/react';
import { useCallback, useMemo } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export function useApi() {
  const { getToken } = useAuth();

  const request = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    const token = await getToken();
    
    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${token}`);
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle structured errors from our backend
      const message = data.error || data.message || 'API request failed';
      const error = new Error(message) as any;
      error.status = response.status;
      error.issues = data.issues;
      throw error;
    }

    return data;
  }, [getToken]);

  return useMemo(() => ({
    get: (endpoint: string) => request(endpoint, { method: 'GET' }),
    post: (endpoint: string, body: unknown) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    patch: (endpoint: string, body: unknown) => request(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
    delete: (endpoint: string) => request(endpoint, { method: 'DELETE' }),
  }), [request]);
}
