import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    icon: {
      marginTop: '-2px',
      width: `${theme.shape.iconSize.xLarge}px`,
      height: `${theme.shape.iconSize.xLarge}px`,
    },
  };
};
