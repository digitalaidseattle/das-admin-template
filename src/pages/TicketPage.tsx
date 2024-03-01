/**
 * TicketPage.tsx
 * Display information of a ticket
 */
// material-ui
import { Grid, Stack, TextField, Typography } from '@mui/material';
import MainCard from '../components/MainCard';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Ticket, TicketHistory, TicketProps, ticketService } from '../sections/tickets/ticketService';
import moment from 'moment';

// project import


const TicketForm: React.FC<TicketProps> = ({ ticket }) => {
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
          value={ticket.clientName}
        />
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email Address"
          fullWidth
          variant="outlined"
          value={ticket.email}
        />
        <TextField
          id="phone"
          name="phone"
          type="phone"
          label="Phone"
          fullWidth
          variant="outlined"
          value={ticket.phone}
        />
        <TextField
          id="summary"
          name="summary"
          type="text"
          label="Summary"
          fullWidth
          variant="outlined"
          value={ticket.summary}
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
        />
      </Stack>
    </MainCard>
  )
}


const TicketHistory: React.FC<TicketProps> = ({ ticket }) => {
  return (<MainCard title="History">
    <Stack spacing={'1rem'}>
      {ticket.ticket_history
        .sort((h1: TicketHistory, h2: TicketHistory) => h2.created_at.getTime() - h1.created_at.getTime())
        .map((hist: TicketHistory, idx: number) => {
          const date = moment(hist.created_at)
          return <MainCard key={idx}>
            <Typography>Action: {hist.description}</Typography>
            <Typography>Date: {date.format("MM-DD-YYYY")} {date.format("hh:mm")}</Typography>
            <Typography>Change By: {hist.change_by}</Typography>
          </MainCard>
        })}
    </Stack>
  </MainCard>);
}

const TicketPage = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState<Ticket>();

  useEffect(() => {
    ticketService.getTicket(Number(id))
      .then((resp: Ticket) => setTicket(resp))
  }, [id]);


  return (
    ticket &&
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">{`Ticket: ${ticket.summary}`}</Typography>
      </Grid>

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <TicketForm ticket={ticket} />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        < TicketHistory ticket={ticket} />
      </Grid>
    </Grid>
  );
}

export default TicketPage;
