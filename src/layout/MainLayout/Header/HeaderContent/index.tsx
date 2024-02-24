// material-ui
import { Box, useMediaQuery, useTheme } from '@mui/material';

// project import
import MobileSection from './MobileSection';
import Notification from './Notification';
import Profile from './Profile';
import Search from './Search';
import ServiceTicket from './ServiceTicket';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent: React.FC = ({ }) => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {!matchesXs && <Search />}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}
      <ServiceTicket />
      <Notification />
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
