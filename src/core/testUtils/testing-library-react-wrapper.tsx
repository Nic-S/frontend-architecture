import React, { PropsWithChildren, ReactElement } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderOptions } from '@testing-library/react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MemoryRouter } from 'react-router-dom';
import { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import type { AppStore, RootState } from '../store';
import { setupStore } from '../store';

const AllTheProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>;
};

const customRender = (
  ui: ReactElement,
  {
    initialEntries,
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: Omit<
    RenderOptions & {
      initialEntries?: string[];
      preloadedState?: PreloadedState<RootState>;
      store?: AppStore;
    },
    'wrapper'
  > = {}
) => {
  const childElement: React.ReactElement = (
    <Provider store={store}>
      {initialEntries ? <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter> : ui}
    </Provider>
  );
  return render(childElement, { wrapper: AllTheProviders, ...renderOptions });
};

export * from '@testing-library/react';
export { customRender as render };
