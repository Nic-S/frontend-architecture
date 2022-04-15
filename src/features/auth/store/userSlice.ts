import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../model/user';
import api from '../services/api';
import { type AppThunk, type RootState } from '../../../core/store';
import { setJwtToken } from '../../../core/services/webStorageService';

interface UserSliceState {
  data: User | null;
  isFetching: boolean;
  error: string;
}

const initialState = {
  data: null,
  isFetching: false,
  error: '',
} as UserSliceState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startFetch: (state: UserSliceState) => ({ ...state, isFetching: true }),
    finishFetch: (state: Draft<UserSliceState>, action: PayloadAction<User>) => {
      return { isFetching: false, data: { ...action.payload }, error: '' };
    },
    fail: (state: UserSliceState, action: PayloadAction<string>) => ({
      ...state,
      isFetching: false,
      error: action.payload,
    }),
  },
});

export const { startFetch, finishFetch, fail } = userSlice.actions;

export const fetchUser = (): AppThunk => async dispatch => {
  dispatch(startFetch());
  try {
    const user = await api.getUser();
    dispatch(finishFetch(user));
  } catch (error) {
    dispatch(fail(JSON.stringify(error)));
  }
};

export const refreshTokenAndFetchUser = (): AppThunk => async dispatch => {
  dispatch(startFetch());
  try {
    const response = await api.refreshToken();
    setJwtToken(response.data.access_token);
    const user = await api.getUser();
    dispatch(finishFetch(user));
  } catch (error) {
    dispatch(fail(JSON.stringify(error)));
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = (state: RootState) => state.user.data as User;

export default userSlice.reducer;
