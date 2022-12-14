/** @jsxImportSource @emotion/react */
import React, { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import style from './page.style';
import { Header } from './Header';

interface PageProps {
  title: string;
  backButton?: boolean;
}

export const Page: React.FC<PropsWithChildren<PageProps>> = (props): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, title, backButton } = props;
  return (
    <Box css={style.container}>
      <Header title={title} />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Box>
  );
};
