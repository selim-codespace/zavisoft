import { configureStore } from '@reduxjs/toolkit';
import { platziApi } from './api/platziApi';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [platziApi.reducerPath]: platziApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(platziApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
