import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import Dot from "../../components/@extended/Dot";
import { TicketProps } from "./ticketService";

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

export { TicketLink, TicketStatus, TicketContact };
