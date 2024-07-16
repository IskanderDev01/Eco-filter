const { createApi, fetchBaseQuery } = await import(
    '@reduxjs/toolkit/query/react'
);
import { TOKEN } from 'shared/const/localstorage';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://backecofiltr.facescan.uz/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(TOKEN) || '';
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['clients', 'update'],
    endpoints: (build) => ({}),
});
