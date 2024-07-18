import { rtkApi } from 'shared/api/rtkApi';
import { ClientData } from '../model/types/client';
interface GetUsersQueryParams {
    sort: string;
    search: string;
    page?: number;
    limit?: number;
}
const clientsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getClients: build.query<ClientData, GetUsersQueryParams>({
            query: ({ sort, search, limit, page }) => ({
                url: `/users/filters/all${sort ? `?filter=${sort}` : ``}`,
                params: {
                    per_page: limit,
                    page,
                    search,
                },
            }),
            providesTags: ['clients'],
        }),
        deleteItem: build.mutation<void, number>({
            query: (id: number) => ({
                url: `/user/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['clients'],
        }),
        updateItem: build.mutation<void, number>({
            query: (id: number) => ({
                url: `/filter/update/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['clients'],
        }),
    }),
});

export const useGetClients = clientsApi.useGetClientsQuery;
export const useDeletClients = clientsApi.useDeleteItemMutation;
export const useUpdateItem = clientsApi.useUpdateItemMutation;
