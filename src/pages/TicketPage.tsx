/**
 * TicketPage.tsx
 * Display information of a ticket
 */
// material-ui
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import MainCard from '../components/MainCard';
import { UserContext } from '../components/contexts/UserContext';
import { TicketHistoryCard } from '../sections/tickets/TableUtils';
import { Ticket, TicketProps, ticketService } from '../sections/tickets/ticketService';

// project import
interface TicketFormProps extends TicketProps {
  onChanged: (field: string, value: any) => void;
}

const TicketForm: React.FC<TicketFormProps> = ({ ticket, onChanged }) => {
  const [t, setT] = useState<Ticket>(ticket);
  useEffect(() => {
    setT(ticket)
  }, [ticket])
  return (
    <MainCard>
      <Stack spacing={'1rem'}>
        <TextField
          id="clientName"
          name="clientName"
          type="text"
          label="Client Name"
          fullWidth
          variant="outlined"
          value={t.clientName}
          onChange={(e) => onChanged('clientName', e.target.value)}
        />
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email Address"
          fullWidth
          variant="outlined"
          value={ticket.email}
          onChange={(e) => onChanged('email', e.target.value)}
        />
        <TextField
          id="phone"
          name="phone"
          type="phone"
          label="Phone"
          fullWidth
          variant="outlined"
          value={ticket.phone}
          onChange={(e) => onChanged('phone', e.target.value)}
        />
        <TextField
          id="summary"
          name="summary"
          type="text"
          label="Summary"
          fullWidth
          variant="outlined"
          value={ticket.summary}
          onChange={(e) => onChanged('summary', e.target.value)}
        />
        <TextField
          id="description"
          name="description"
          type="text"
          label="Description"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={ticket.description}
          onChange={(e) => onChanged('description', e.target.value)}
        />
      </Stack>
    </MainCard>
  )
}

const TicketPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [ticket, setTicket] = useState<Ticket>();
  const [changes, setChanges] = useState<any>({});

  useEffect(() => {
    ticketService.getTicket(Number(id))
      .then((resp: Ticket) => {
        setTicket(resp);
        setChanges({});
      })
  }, [id]);

  const handleChange = (field: string, value: any) => {
    changes[field] = value;
    setChanges(Object.assign({}, changes))

    const clone = Object.assign({}, ticket);
    setTicket(Object.assign(clone, changes))
  }

  const reset = () => {
    ticketService.getTicket(Number(id))
      .then((resp: Ticket) => setTicket(resp))
  }

  const save = () => {
    ticketService.updateTicket(user!, ticket!, changes)
      .then((resp: Ticket) => {
        setTicket(resp);
        setChanges({});
      })
  }

  return (

    ticket &&
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Stack direction="row" justifyContent={'space-between'} >
          <Typography variant="h5">{`Ticket: ${ticket.summary}`}</Typography>
          <Stack direction="row" spacing={'1rem'}>
            <Button
              title='Action'
              variant="contained"
              color="secondary"
              onClick={reset}>
              {'Reset'}
            </Button>
            <Button
              title='Action'
              variant="contained"
              color="primary"
              disabled={Object.entries(changes).length === 0}
              onClick={save}>
              {'Save'}
            </Button>
          </Stack>
        </Stack>
      </Grid>

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <TicketForm ticket={ticket} onChanged={handleChange} />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <TicketHistoryCard ticket={ticket} />
      </Grid>
    </Grid>
  );
}

export default TicketPage;
