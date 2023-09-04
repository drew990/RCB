import { configureStore } from '@reduxjs/toolkit';
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper';
import { createWrapper } from 'next-redux-wrapper';
import superjson from 'superjson';

import { cartSlice } from '@/stores/slices/cart';
import { catalogSlice } from '@/stores/slices/catalog';

export const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: {
      [cartSlice.name]: cartSlice.reducer,
      [catalogSlice.name]: catalogSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).prepend(
        nextReduxCookieMiddleware({
          subtrees: [cartSlice.name],
          serializationFunction: (state) => superjson.stringify(state),
          deserializationFunction: (state) => superjson.parse(state),
        })
      ),
  })
);

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, {
  serializeState: (state) => superjson.stringify(state),
  deserializeState: (state) => superjson.parse(state),
});
