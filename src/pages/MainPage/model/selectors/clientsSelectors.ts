import { StateSchema } from 'app/providers/StoreProvider';

export const getDays = (state: StateSchema) => state.clients?.days;
export const getSearch = (state: StateSchema) => state.clients?.search;
export const getCurrent = (state: StateSchema) =>
    state.clients.current_page ?? 1;
export const getId = (state: StateSchema) => state.clients.id;
export const getPage = (state: StateSchema) => state.clients.page;
