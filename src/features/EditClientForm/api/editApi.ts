import { rtkApi } from 'shared/api/rtkApi';
import { UserResponse } from '../models/types/editType'

const editApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getClient: build.query<UserResponse, number | undefined>({
            query: (id) => `/user/about/${id}`,
        }),
        updateClient: build.mutation({
            query: (arg) => ({
                url: `/user/update/${arg.id}`,
                method: 'PUT',
                body: arg,
            }),
            invalidatesTags: ['clients']
        })
    }),
});

export const getUserEdit = editApi.useLazyGetClientQuery;
export const updateClient = editApi.useUpdateClientMutation;
