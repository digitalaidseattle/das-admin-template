/**
 *  App.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import React, { useRef, useState } from 'react';

// material-ui
import {
  Box,
  IconButton,
  Snackbar,
  Typography
} from '@mui/material';

// project import

// assets
import { ThunderboltOutlined } from '@ant-design/icons';
import TicketDialog from './TicketDialog';


// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const TicketToolbarItem: React.FC = () => {

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const iconBackColorOpen = 'grey.300';
  const iconBackColor = 'grey.100';

  const handleSuccess = (resp: any) => {
    if (resp) {
      setOpenSnack(true)
    }
    setOpen(false);
  };

  const handleError = (err: any) => {
    console.error(err);
    setOpen(false);
  };

  const toggle = () => {
    setOpen(!open);
  };


  return (
    <React.Fragment>
      <Box sx={{ flexShrink: 0, ml: 0.75 }}>
        <IconButton
          disableRipple
          color="secondary"
          sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
          aria-label="open profile"
          ref={anchorRef}
          aria-controls={open ? 'profile-grow' : undefined}
          aria-haspopup="true"
          onClick={toggle}
        >
          <ThunderboltOutlined />
        </IconButton>
      </Box>
      <TicketDialog open={open} handleSuccess={handleSuccess} handleError={handleError} />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openSnack}
        autoHideDuration={6000}
        message={<Typography>Ticket created.</Typography>}
        onClose={() => setOpenSnack(false)}
      />
    </React.Fragment>
  );
};

export default TicketToolbarItem;
