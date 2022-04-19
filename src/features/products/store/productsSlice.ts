import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import api from '../services/api';
import { DEFAULT_CACHE_TTL } from '../../../constants';
import { type AppThunk, type RootState } from '../../../core/store';
import { Product } from '../models/product';

interface CardsSliceState {
  data: Product[];
  isFetching: boolean;
  error: string;
  isValidCache: boolean;
  // sort: SortField;
  // filter: FilterField;
  // pagination: Pagination;
}

const initialState = {
  data: [],
  isFetching: false,
  error: '',
  isValidCache: false,
} as CardsSliceState;

export const productsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    startFetch: (state: Draft<CardsSliceState>) => ({ ...state, isFetching: true }),
    finishFetch: (state: Draft<CardsSliceState>, payloadAction: PayloadAction<Product[]>) => {
      return {
        ...state,
        isFetching: false,
        isValidCache: true,
        data: [...payloadAction.payload],
        error: '',
      };
    },
    httpError: (state: Draft<CardsSliceState>, payloadAction: PayloadAction<string>) => ({
      ...state,
      isFetching: false,
      error: payloadAction.payload,
    }),
    invalidateCache: (state: Draft<CardsSliceState>) => ({ ...state, isValidCache: false }),
  },
});

export const { startFetch, finishFetch, httpError, invalidateCache } = productsSlice.actions;

export const fetchProducts = (): AppThunk => async (dispatch, state) => {
  if (!state().products.isValidCache) {
    await dispatch(startFetch());
    try {
      const products = await api.getProducts();
      await dispatch(finishFetch(products));
    } catch (error) {
      dispatch(httpError(JSON.stringify(error)));
    }
    setTimeout(() => dispatch(invalidateCache()), DEFAULT_CACHE_TTL);
  }
};

export const selectProducts = (state: RootState): Product[] => state.products.data;
export const selectIsFetching = (state: RootState): boolean => state.products.isFetching;

export default productsSlice.reducer;
