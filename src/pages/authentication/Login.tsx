
// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import Logo from '../../components/Logo/Logo';
import CenteredCard from '../../layout/MinimalLayout/CenteredCard';
import MinimalWrapper from '../../layout/MinimalLayout/MinimalWrapper';
import FirebaseSocial from './auth-forms/FirebaseSocial';
import { useTheme } from '@mui/material/styles';

// ================================|| 404 ||================================ //

const Login: React.FC = () => {
  const theme = useTheme();

  return (<MinimalWrapper>
    <Grid
      container
      sx={{
        backgroundColor: theme.palette.primary.main
      }}
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center">
      <Grid item xs={3}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Logo />
          <Typography variant="h5" color={theme.palette.primary.contrastText}>{import.meta.env.VITE_APPLICATION_NAME}</Typography>
        </Stack>
      </Grid>
      <CenteredCard>
        <Grid container spacing={3} >
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
    </Grid>
  </MinimalWrapper>)
};

export default Login;
