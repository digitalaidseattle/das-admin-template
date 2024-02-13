/**
 *  AuthWrapper.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { ReactNode } from 'react';

// material-ui
import { Box, Grid, Stack, Typography } from '@mui/material';

// project import

// assets
import Logo from '../../components/Logo/Logo';
import MinimalFooter from './MinimalFooter';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const MinimalWrapper = (props: { children: ReactNode }) => (
  <Box sx={{ minHeight: '100vh' }}>
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{
        minHeight: '100vh'
      }}
    >
      <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Logo />
          <Typography variant="h5">{import.meta.env.VITE_APPLICATION_NAME}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
        >
          <Grid item>
            {props.children}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        <MinimalFooter />
      </Grid>
    </Grid>
  </Box>
);

export default MinimalWrapper;
