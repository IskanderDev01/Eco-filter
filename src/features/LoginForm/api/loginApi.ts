import { rtkApi } from 'shared/api/rtkApi';

interface Login {
    email: string;
    password: string;
}
interface LoginResponse {
    token: string;
}
const loginApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginResponse, Login>({
            query: (arg) => ({
                url: '/login',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
});

export const { useLoginMutation } = loginApi;
