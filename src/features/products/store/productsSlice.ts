import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import formatISO from 'date-fns/formatISO';
import api from '../services/api';
import { DEFAULT_CACHE_TTL } from '../../../constants';
import { type AppThunk, type RootState } from '../../../core/store';
import { Product } from '../models/product';

interface ProductsSliceState {
  data: Product[];
  isFetching: boolean;
  error: string;
  isValidCache: boolean;
  isIdle: boolean
  // sort: SortField;
  // filter: FilterField;
  // pagination: Pagination;
}

const initialState = {
  data: [],
  isFetching: false,
  error: '',
  isValidCache: false,
  isIdle: true
} as ProductsSliceState;

export const productsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    startFetch: (state: Draft<ProductsSliceState>) => ({ ...state, isFetching: true, isIdle: false }),
    finishFetch: (state: Draft<ProductsSliceState>, payloadAction: PayloadAction<Product[]>) => {
      return {
        ...state,
        isFetching: false,
        isValidCache: true,
        data: [...payloadAction.payload],
        error: '',
      };
    },
    httpError: (state: Draft<ProductsSliceState>, payloadAction: PayloadAction<string>) => ({
      ...state,
      isFetching: false,
      error: payloadAction.payload,
    }),
    invalidateCache: (state: Draft<ProductsSliceState>) => ({ ...state, isValidCache: false }),
    changeDate: (
      state: Draft<ProductsSliceState>,
      payloadAction: PayloadAction<{ value: Date; productId: string }>
    ) => {
      const { value, productId } = payloadAction.payload;
      const products = [...state.data];
      const existingItemIndex = products.findIndex((p: Product) => p.id === productId);
      if (existingItemIndex > -1) {
        const product = { ...products[existingItemIndex] };
        product.productDate = formatISO(value, { representation: 'date' });
        products[existingItemIndex] = product;
      }
      return {
        ...state,
        data: products,
      };
    },
  },
});

export const { startFetch, finishFetch, httpError, invalidateCache, changeDate } = productsSlice.actions;

export const fetchProducts = (): AppThunk => async (dispatch, state) => {
  if (!state().products.isValidCache) {
    if(!state().products.isFetching) {
    await dispatch(startFetch());
      try {
        const products = await api.getProducts();
        await dispatch(finishFetch(products));
      } catch (error) {
        dispatch(httpError(JSON.stringify(error)));
      }
    }
    setTimeout(() => dispatch(invalidateCache()), DEFAULT_CACHE_TTL);
  }
};

export const changeProductDate =
  (value: Date, productId: string): AppThunk =>
  async (dispatch, state) => {
    try {
      await api.changeDate(productId, value); // if return new product set that or change date inside state
      dispatch(changeDate({ value, productId }));
    } catch (error) {
      dispatch(httpError(JSON.stringify(error)));
    }
  };

export const changeContractDate =
  (value: Date, productId: string): AppThunk<Promise<void>> =>
  async (dispatch, state) => {
    try {
      return api.changeDate(productId, value); // if return new product set that or change date inside state
    } catch (error) {
      dispatch(httpError(JSON.stringify(error)));
      return Promise.reject();
    }
  };

export const selectProducts = (state: RootState): Product[] => state.products.data;
export const selectIsFetching = (state: RootState): boolean => state.products.isFetching;
export const selectIsIdle = (state: RootState): boolean => state.products.isIdle;

export default productsSlice.reducer;
