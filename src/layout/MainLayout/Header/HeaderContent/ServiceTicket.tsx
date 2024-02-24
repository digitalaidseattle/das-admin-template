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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// project import

// assets
import { ThunderboltOutlined } from '@ant-design/icons';
import useAppConstants from '../../../../services/useAppConstants';
import { ticketService } from '../../../../services/ticketService';


// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const ServiceTicket: React.FC = () => {

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const iconBackColorOpen = 'grey.300';
  const iconBackColor = 'grey.100';

  const { data: sources } = useAppConstants('SOURCE');
  const [source, setSource] = useState("email");

  const handleClose = () => {
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
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            ticketService.createTicket(formJson)
              .then((resp: any) => {
                console.log('resp', resp);
                handleClose();
                setOpenSnack(true)
              })
          },
        }}
      >
        <DialogTitle><Typography fontSize={24}>Create Service Ticket</Typography></DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>
            <FormControl>
              <InputLabel>Input Source</InputLabel>
              <Select
                id="inputSource"
                name='inputSource'
                value={source}
                label="Input Source"
                fullWidth
                onChange={(event) => setSource(event.target.value)}>
                {sources.map((s, idx: number) => <MenuItem key={idx} value={s.value}>{s.label}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField
              id="clientName"
              name="clientName"
              type="text"
              label="Client Name"
              fullWidth
              variant="standard"
            />
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email Address"
              fullWidth
              variant="standard"
            />
            <TextField
              id="phone"
              name="phone"
              type="phone"
              label="Phone"
              fullWidth
              variant="standard"
            />
            <TextField
              id="summary"
              name="summary"
              type="text"
              label="Summary"
              fullWidth
              variant="standard"
            />
            <TextField
              id="description"
              name="description"
              type="text"
              label="Description"
              fullWidth
              variant="standard"
              multiline
              rows={4}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            sx={{ color: 'text.secondary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
            onClick={handleClose}>Cancel</Button>
          <Button
            variant='outlined'
            sx={{ color: 'text.success', bgcolor: open ? iconBackColorOpen : iconBackColor }}
            type="submit">OK</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openSnack}
        autoHideDuration={6000}
        message={<Typography>"Ticket created."</Typography>}
        onClose={() => setOpenSnack(false)}
      />
    </React.Fragment>
  );
};

export default ServiceTicket;
