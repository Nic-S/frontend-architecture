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
    <Box css={style.container}>
      <Typography variant='h3' sx={{ paddingBottom: '12px' }}>
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Box>
  );
};
