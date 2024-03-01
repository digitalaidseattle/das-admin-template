
// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import CenteredCard from '../../layout/MinimalLayout/CenteredCard';
import MinimalWrapper from '../../layout/MinimalLayout/MinimalWrapper';
import FirebaseSocial from './auth-forms/FirebaseSocial';

// ================================|| 404 ||================================ //

const Login: React.FC = () => {

  return (<MinimalWrapper>
    <CenteredCard>
      <Grid container spacing={3} style={{ textAlign: "center" }}>
        <Grid item xs={12} >
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Please login</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <FirebaseSocial />
        </Grid>
      </Grid>
    </CenteredCard>
  </MinimalWrapper>)
};

export default Login;
