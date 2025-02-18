/**
 * TicketPage.tsx
 * Display information of a ticket
 */

// react
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

// material-ui
import { Button, Grid, Stack, Typography } from '@mui/material';

import { DASSnackbar } from '../../components/DASSnackbar';
import { UserContext } from '@digitalaidseattle/core';
import { TicketHistoryCard, TicketLongForm } from './TicketComponents';
import { Ticket, ticketService } from './ticketService';
import { Staff, staffService } from './staffService';

const Labels = {
  updateMessage: 'Ticket updated.',
  saveButton: 'Save',
  resetButton: 'Reset',
}
const TicketPage = () => {
  const { id } = useParams();
  const { user } = useContext<any>(UserContext);
  const [ticket, setTicket] = useState<Ticket>();
  const [changes, setChanges] = useState<Map<string, unknown>>(new Map());
  const [messages, setMessages] = useState<Map<string, string>>(new Map());
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [staff, setStaff] = useState<Staff[]>();

  useEffect(() => {
    ticketService.getById(id)
      .then((resp: Ticket) => {
        setTicket(resp);
        setChanges(new Map());
      })
  }, [id]);

  useEffect(() => {
    staffService.getAll()
      .then((resp: Staff[]) => {
        setStaff(resp);
      })
  }, []);

  const handleChange = (field: string, value: unknown) => {
    changes.set(field, value);
    setChanges({ ...changes })

    const clone = Object.assign({}, ticket);
    const updated = Object.assign(clone, changes)
    setTicket(updated)

    setMessages(ticketService.validateTicket(updated));
  }

  const reset = () => {
    ticketService.getById(id)
      .then((resp: Ticket) => setTicket(resp))
  }

  const save = () => {
    ticketService.update(user!, ticket!, changes)
      .then((resp: Ticket) => {
        setTicket(resp);
        setChanges(new Map());
        setOpenSnack(true);
      })
  }

  return (
    ticket &&
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Stack direction="row" justifyContent={'space-between'} >
            <Typography variant="h5">{`Ticket: ${ticket.summary} (id = ${ticket.id})`}</Typography>
            <Stack direction="row" spacing={'1rem'}>
              <Button
                title={Labels.resetButton}
                variant="contained"
                color="secondary"
                onClick={reset}>
                {Labels.resetButton}
              </Button>
              <Button
                title={Labels.saveButton}
                variant="contained"
                color="primary"
                disabled={Object.entries(changes).length === 0 || messages!.size > 0}
                onClick={save}>
                {Labels.saveButton}
              </Button>
            </Stack>
          </Stack>
        </Grid>

        {/* row 2 */}
        <Grid item xs={12} md={7} lg={8}>
          <TicketLongForm
            ticket={ticket}
            staff={staff!}
            messages={messages!}
            onChanged={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <TicketHistoryCard ticket={ticket} />
        </Grid>
      </Grid>
      <DASSnackbar
        message={Labels.updateMessage}
        open={openSnack}
        severity={'success'}
        onClose={() => setOpenSnack(false)} />
    </>
  );
}

export default TicketPage;
