import { CombinedState, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
const { configureStore } = await import('@reduxjs/toolkit');
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';
import { rtkApi } from 'shared/api/rtkApi';
import { clientsSliceReducer } from 'pages/MainPage/model/slice/clientSlice';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        clients: clientsSliceReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({}).concat(rtkApi.middleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
