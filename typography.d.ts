import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    small1: React.CSSProperties;
    small2: React.CSSProperties;
    tiny: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    small1?: React.CSSProperties;
    small2?: React.CSSProperties;
    tiny?: React.CSSProperties;
  }
}

// // Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    small1: true;
    small2: true;
    tiny: true;
  }
}
