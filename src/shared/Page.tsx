/** @jsxImportSource @emotion/react */
import React, { PropsWithChildren } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import style from './page.style';

interface PageProps {
  title: string;
  backButton?: boolean;
}

export const Page: React.FC<PropsWithChildren<PageProps>> = (props): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, title, backButton } = props;
  return (
    <>
      <Typography variant='h3'>{title}</Typography>
      <Box css={style.container}>{children}</Box>
    </>
  );
};
