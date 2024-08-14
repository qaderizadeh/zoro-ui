/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { useStyles } from './styles';
import { Token } from '@/types';
import React from 'react';

export interface TokenIconProps {
  token: Token;
  className?: string;
}

export const TokenIcon: React.FC<TokenIconProps> = ({ className, token }) => {
  const styles = useStyles();

  const Icon = token.asset;

  if (!Icon) {
    return null;
  }

  return (
    <Icon
      css={styles.icon}
      alt={token.symbol}
      className={className}
      title={token.symbol}
    />
  );
};
