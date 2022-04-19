/** @jsxImportSource @emotion/react */
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../core/store';
import { loginAndFetchUser } from '../store/userSlice';
import { getRedirectPagePath } from '../../../core/services/webStorageService';

export const Login = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleOnClick = useCallback(async () => {
    await dispatch(loginAndFetchUser());
    const redirectPath = getRedirectPagePath();
    navigate(redirectPath, { replace: true });
  }, [dispatch, navigate]);

  return (
    <Card sx={{ height: '100%', display: 'flex' }}>
      <CardContent sx={{ margin: 'auto' }}>
        <Typography variant='h3'>{t('login.title')}</Typography>
        <Box sx={{ display: 'flex' }}>
          <Button variant='contained' sx={{ margin: 'auto' }} onClick={handleOnClick}>
            {t('login.enter')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
