import { rtkApi } from 'shared/api/rtkApi';

const getMeApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getMe: build.query<any, void>({
            query: () => '/getme',
        }),
    }),
});

export const useGetMeApi = getMeApi.useGetMeQuery;
