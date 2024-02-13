
// material-ui
import { Button, Grid, Stack, Typography } from '@mui/material';

// project import
import { useNavigate } from 'react-router';
import CenteredCard from '../../layout/MinimalLayout/CenteredCard';
import MinimalWrapper from '../../layout/MinimalLayout/MinimalWrapper';

// ================================|| LOGIN ||================================ //

const Page404: React.FC = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/');
  }
  return (<MinimalWrapper>
    <CenteredCard>
      <Grid container spacing={3} style={{ textAlign: "center" }}>
        <Grid item xs={12} >
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Page Not Found</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Button
            size="large"
            onClick={handleReturn}
            color={'primary'}
            variant={'outlined'}
          >
            Return to the home page
          </Button>
        </Grid>
      </Grid>
    </CenteredCard>
  </MinimalWrapper>)
};

export default Page404;
