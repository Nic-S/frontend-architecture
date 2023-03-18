import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  createAction,
  PreloadedState,
  ThunkAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { deleteJwtToken } from './services/webStorageService';
import userReducer from '../features/auth/store/userSlice';
import productsReducer from '../features/products/store/productsSlice';

export const logoutAction = createAction<void>('LOGOUT');
const combinedReducer = combineReducers({ user: userReducer, products: productsReducer });

const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  if (action.type === 'LOGOUT') {
    deleteJwtToken();
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV === 'development',
    preloadedState,
  });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof combinedReducer>;

export type AppDispatch = AppStore['dispatch'];
export type AppStore = ReturnType<typeof setupStore>;
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, Action<string>>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
