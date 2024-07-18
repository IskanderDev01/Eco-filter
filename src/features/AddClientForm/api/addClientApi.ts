import { rtkApi } from 'shared/api/rtkApi';

const addClientApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        createClient: build.mutation({
            query: (arg) => ({
                url: '/user/create',
                method: 'POST',
                body: arg,
            }),
            invalidatesTags: ['clients']
        }),
    }),
});

export const useCreateClient = addClientApi.useCreateClientMutation;
