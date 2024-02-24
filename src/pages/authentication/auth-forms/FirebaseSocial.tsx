// material-ui
import { Button, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// assets
import Facebook from '../../../assets/images/icons/facebook.svg';
import Google from '../../../assets/images/icons/google.svg';
import Microsoft from '../../../assets/images/icons/microsoft.svg';
import { authService } from '../../../services/authService';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const FirebaseSocial = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const googleHandler = async () => {
    authService.signInWithGoogle()
      .then(resp => console.log(resp))
  };

  const microsoftHandler = async () => {
    authService.signInWithAzure()
      .then(resp => console.log(resp))
  };

  return (
    <Stack
      direction="row"
      spacing={matchDownSM ? 1 : 2}
      justifyContent={matchDownSM ? 'space-around' : 'space-between'}
      sx={{ '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}
    >
      <Button
        title='Login with Google'
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={googleHandler}>
        {!matchDownSM && 'Google'}
      </Button>

      <Button
        title='Login with Microsoft'
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Microsoft} alt="Microsoft" />}
        onClick={microsoftHandler}>
        {!matchDownSM && 'Microsoft'}
      </Button>

      {/* <Button
        title='Login with Facebook'
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Facebook} alt="Facebook" />}
        onClick={facebookHandler}>
        {!matchDownSM && 'Facebook'}
      </Button> */}
    </Stack>
  );
};

export default FirebaseSocial;
