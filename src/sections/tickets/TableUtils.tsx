import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import Dot from "../../components/@extended/Dot";
import { TicketHistory, TicketProps } from "./ticketService";
import MainCard from "../../components/MainCard";
import moment from "moment";

// ==============================|| Table Cell Renderers ||============================== //


const TicketContact: React.FC<TicketProps> = ({ ticket }) => {
    const strings = [ticket.email, ticket.phone];
    return strings.filter(s => s).join(" | ");
}

const TicketStatus: React.FC<TicketProps> = ({ ticket }) => {
    let color;
    let title;

    switch (ticket.status) {
        case 'completed':
            color = 'success';
            title = 'Completed';
            break;
        case 'inprogress':
            color = 'warning';
            title = 'In Progress';
            break;
        case 'blocked':
            color = 'error';
            title = 'Blocked';
            break;
        case 'new':
        default:
            color = 'primary';
            title = 'New';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

const TicketLink: React.FC<TicketProps> = ({ ticket }) => {
    return <Link color="secondary" component={RouterLink} to={`/ticket/${ticket.id}`}>
        {ticket.id}
    </Link>
}

const TicketHistoryCard: React.FC<TicketProps> = ({ ticket }) => {
    return (<MainCard title="History">
        <Stack spacing={'1rem'}>
            {ticket.ticket_history
                .sort((h1: TicketHistory, h2: TicketHistory) => moment(h2.created_at).diff(moment(h1.created_at)))
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

export { TicketHistoryCard, TicketLink, TicketStatus, TicketContact };
