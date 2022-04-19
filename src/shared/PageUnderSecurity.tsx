/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Page } from './Page';
import { selectUser } from '../features/auth/store/userSlice';
import { getJwtToken, setRedirectPagePath } from '../core/services/webStorageService';

interface RequireAuthProps {
  children: JSX.Element;
}

// A wrapper that redirects to the login
// screen if you're not yet authenticated.
// Note if token is expired the interceptor redirect to login
const RequireAuth = ({ children }: RequireAuthProps) => {
  const user = useSelector(selectUser);
  const path = useLocation().pathname;
  setRedirectPagePath(path);
  return getJwtToken() ? user ? children : <CircularProgress size='big' /> : <Navigate to='/login' replace />;
};

interface PageProps {
  title: string;
  backButton?: boolean;
  children: JSX.Element;
}

export const PageUnderSecurity = (props: PageProps) => {
  const { children, title, backButton } = props;
  return (
    <RequireAuth>
      <Page title={title} backButton={backButton}>
        {children}
      </Page>
    </RequireAuth>
  );
};
