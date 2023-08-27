import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

type UpdateCartItemPayload = {
  id: string;
  quantity: number;
};

type DeleteCartItemPayload = {
  id: string;
};

type State = {
  items: Record<string, number>;
};

const initialState: State = {
  items: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartItem: (state, action: PayloadAction<UpdateCartItemPayload>) => {
      const existingCartItemQuantity = state.items[action.payload.id] ?? 0;
      state.items = Object.assign({}, state.items, {
        [action.payload.id]: existingCartItemQuantity + action.payload.quantity,
      });
    },
    deleteCartItem: (state, action: PayloadAction<DeleteCartItemPayload>) => {
      const newItems = { ...state.items };
      delete newItems[action.payload.id];
      state.items = newItems;
    },
  },
  extraReducers(builder) {
    builder.addCase<string, PayloadAction<{ cart: State }>>(
      HYDRATE,
      (state, action) => {
        const { items } = action.payload?.cart ?? {};
        state.items = Object.assign({}, state.items, items);
      }
    );
  },
});

export const { updateCartItem, deleteCartItem } = cartSlice.actions;
