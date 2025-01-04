
// material-ui
import { Box, Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';

// project import
import {
  useLayoutConfiguration
} from '@digitalaidseattle/mui';
import { useNavigate } from 'react-router';

// ================================|| 404 ||================================ //

const Page404: React.FC = () => {
  const navigate = useNavigate();
  const { configuration } = useLayoutConfiguration();


  const handleReturn = () => {
    navigate('/');
  }
  return (
    <Card>
      <CardContent sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CardMedia
            component="img"
            sx={{
              objectFit: "cover",
              width: "150px"
            }}
            image={configuration.logoUrl}
            alt={configuration.appName + ' Logo'}
          />
        </Box>
        <Typography variant="h3" >{configuration.appName}</Typography>
        <Typography variant="h5">Page Not Found</Typography>
        <Stack direction="row" justifyContent="center" alignItems="baseline">
          <Button
            size="large"
            onClick={handleReturn}
            variant={'outlined'}
            color="primary"
          >
            Return to the home page
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
};

export default Page404;
