import React from 'react';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Button, IconButton, Menu } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectUser } from '../features/auth/store/userSlice';
import { AppDispatch, logoutAction } from '../core/store';

interface HeaderPros {
  title: string;
}

export const Header = ({ title }: HeaderPros): JSX.Element => {
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setIsOpen] = React.useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant='h3' sx={{ paddingBottom: '12px' }}>
        {title}
      </Typography>
      {user && (
        <>
          <IconButton sx={{ marginLeft: 'auto' }} onClick={handleOnClick}>
            <Avatar>
              {user.firstName.slice(0, 1)}
              {user.familyName.slice(0, 1)}
            </Avatar>
          </IconButton>
          <Menu
            id='basic-menu'
            data-testid='menu-grid-actions'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}>
            <Box sx={{ padding: '16px' }}>
              <Typography>
                {t('userMenu.greeting')}, {user.firstName} {user.familyName}
              </Typography>
              <Box sx={{ marginTop: '16px' }}>
                <Button variant='contained' size='small' onClick={logout}>
                  {t('userMenu.logout')}
                </Button>
              </Box>
            </Box>
          </Menu>
        </>
      )}
    </Box>
  );
};
