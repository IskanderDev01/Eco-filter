import { PayloadAction } from '@reduxjs/toolkit';
import { ClientsShema } from '../types/client';
const { createSlice } = await import('@reduxjs/toolkit');

const initialState: ClientsShema = {
    id: undefined,
    clients: [],
    search: '',
    days: '',
    total: 0,
    last_page: 0,
    per_page: 0,
    current_page: 1,
    page: 1,
};

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setDays: (state, action: PayloadAction<string>) => {
            state.days = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setCurrent: (state, action: PayloadAction<number | undefined>) => {
            state.current_page = action.payload
        },
        setId: (state, action: PayloadAction<number | undefined>) => {
            state.id = action.payload
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        }
    },
});

export const { actions: clientsSliceActions } = clientsSlice;
export const { reducer: clientsSliceReducer } = clientsSlice;
