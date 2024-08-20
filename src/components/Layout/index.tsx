'use client';
/** @jsxImportSource @emotion/react */
import Box from '@mui/material/Box';
import React, { PropsWithChildren, useContext, useState } from 'react';
import { usePathname } from 'next/navigation';

import Header from './Header';
import { PageContainer } from './PageContainer';
import Sidebar from './Sidebar';
import { useStyles } from './styles';
import { routes } from '@/constants/routing';
import { GeolocationContext } from '@/context/GeolocationContext';
import { Icon } from '../Icon';

export const Layout = ({ children }: PropsWithChildren) => {
  const styles = useStyles();
  const pathname = usePathname();
  const [close, setClose] = useState(false);
  const { geolocation } = useContext(GeolocationContext);

  const isLayout = pathname === routes.notfound.path;
  const onClickClose = () => {
    setClose(true);
  };

  if (isLayout) return <>{children}</>;

  return (
    <div css={styles.layout}>
      <Sidebar />

      <Box display='flex' flexDirection='column' flex='1'>
        {geolocation && (
          <div css={close ? styles.hide : styles.notifyBar}>
            <p css={styles.notifyText}>
              Your are accessing the app from a blocked region
            </p>
            <Icon
              name='close'
              css={styles.notifyClose}
              onClick={onClickClose}
            />
          </div>
        )}
        <div
          css={
            geolocation && !close ? styles.contentWith : styles.contentWithout
          }
        >
          <Header />
          <PageContainer>{children}</PageContainer>
        </div>
      </Box>
    </div>
  );
};
