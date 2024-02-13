
// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import CenteredCard from '../../layout/MinimalLayout/CenteredCard';
import MinimalWrapper from '../../layout/MinimalLayout/MinimalWrapper';
import AuthLogin from './auth-forms/AuthLogin';

// ================================|| LOGIN ||================================ //

const Login = () => (
  <MinimalWrapper>
    <CenteredCard>
      <Grid container spacing={3} style={{ textAlign: "center" }}>
        <Grid item xs={12} >
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </CenteredCard>
  </MinimalWrapper>
);

export default Login;
