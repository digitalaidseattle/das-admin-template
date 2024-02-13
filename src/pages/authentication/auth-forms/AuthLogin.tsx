
// material-ui
import {
  Grid
} from '@mui/material';

// third party
// import * as Yup from 'yup';
// import { Formik } from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial';

// assets

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FirebaseSocial />
        </Grid>
      </Grid>
    </>
  );
};

export default AuthLogin;
