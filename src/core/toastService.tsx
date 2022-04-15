import React, { ReactNode } from 'react';
import { toast, ToastOptions } from 'react-toastify';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const toastService = {
  success: (): React.ReactText =>
    toast.success('Successfully done', { icon: <CheckCircleOutlineIcon />, autoClose: 200000 }),
  warning: (msg: string | ReactNode, options?: ToastOptions): React.ReactText =>
    toast.warning(msg, { icon: <WarningAmberOutlinedIcon />, ...options }),
  error: (msg: string | ReactNode, options?: ToastOptions): React.ReactText =>
    toast.error(msg, { icon: <ErrorOutlineIcon />, ...options }),
  info: (msg: string | ReactNode, options?: ToastOptions): React.ReactText =>
    toast.info(msg, { icon: <InfoOutlinedIcon />, ...options }),
  default: (msg: string | ReactNode, options?: ToastOptions): React.ReactText => toast(msg, options),
  dark: (msg: string | ReactNode, options?: ToastOptions): React.ReactText => toast.dark(msg, options),
};
