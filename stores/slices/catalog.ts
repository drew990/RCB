import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import SquareService, {
  FetchCatalogObjectParams,
  FetchCatalogObjectsParams,
  FetchCatalogParams,
} from '@/services/SquareService';
import { Image, Item, ItemVariation } from '@/services/SquareService';
import { mapData } from '@/stores/utils';

type State = {
  items: Record<string, Item>;
  images: Record<string, Image>;
  itemVariations: Record<string, ItemVariation>;
};

const initialState: State = {
  items: {},
  images: {},
  itemVariations: {},
};

export const fetchCatalogObject = createAsyncThunk(
  'catalog/fetchCatalogObject',
  async (params: FetchCatalogObjectParams) => {
    const square = new SquareService();
    return await square.fetchCatalogObject(params);
  }
);

export const fetchCatalogObjects = createAsyncThunk(
  'catalog/fetchCatalogObjects',
  async (params: FetchCatalogObjectsParams) => {
    const square = new SquareService();
    return await square.fetchCatalogObjects(params);
  }
);

export const fetchCatalog = createAsyncThunk(
  'catalog/fetchCatalog',
  async (params: FetchCatalogParams) => {
    const square = new SquareService();
    return await square.fetchCatalog(params);
  }
);

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCatalogObject.fulfilled, (state, action) => {
        const { items, images, itemVariations } = action.payload;
        state.items = {
          ...state.items,
          ...mapData('id', items),
        };
        if (images) {
          state.images = {
            ...state.images,
            ...mapData('id', images),
          };
        }
        if (itemVariations) {
          state.itemVariations = {
            ...state.itemVariations,
            ...mapData('id', itemVariations),
          };
        }
      })
      .addCase(fetchCatalogObjects.fulfilled, (state, action) => {
        const { items, images, itemVariations } = action.payload;
        state.items = {
          ...state.items,
          ...mapData('id', items),
        };
        if (images) {
          state.images = {
            ...state.images,
            ...mapData('id', images),
          };
        }
        if (itemVariations) {
          state.itemVariations = {
            ...state.itemVariations,
            ...mapData('id', itemVariations),
          };
        }
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        const { items, images, itemVariations } = action.payload;
        state.items = {
          ...state.items,
          ...mapData('id', items),
        };
        if (images) {
          state.images = {
            ...state.images,
            ...mapData('id', images),
          };
        }
        if (itemVariations) {
          state.itemVariations = {
            ...state.itemVariations,
            ...mapData('id', itemVariations),
          };
        }
      })
      .addCase<string, PayloadAction<{ catalog: State }>>(
        HYDRATE,
        (state, action) => {
          const { items, images, itemVariations } =
            action.payload?.catalog ?? {};
          state.items = Object.assign({}, state.items, items);
          state.images = Object.assign({}, state.images, images);
          state.itemVariations = Object.assign(
            {},
            state.itemVariations,
            itemVariations
          );
        }
      );
  },
});
