import React, { useEffect } from 'react';
import './i18n';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Login } from './features/auth/pages/Login';
import { refreshTokenAndFetchUser } from './features/auth/store/userSlice';
import { AppDispatch } from './core/store';
import { getJwtToken } from './core/services/webStorageService';
import { PageUnderSecurity } from './shared/PageUnderSecurity';

const App = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      dispatch(refreshTokenAndFetchUser());
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navigate to='product' replace />} />
      <Route path='/login' element={<Login />} />
      <Route
        path='/product'
        element={
          <PageUnderSecurity title='Landing Page'>
            <div>landing page</div>
          </PageUnderSecurity>
        }
      />
    </Routes>
  );
};

export default App;
