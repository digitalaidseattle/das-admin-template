import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
    Box,
    Link,
    SortDirection,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

// third-party

// project import
import Dot from '../../components/@extended/Dot';
import { Ticket, TicketProps, ticketService } from './ticketService';

function descendingComparator(a: Ticket, b: Ticket, orderBy: string) {
    switch (orderBy) {
        case 'clientName':
            return b.clientName < a.clientName ? -1 : b.clientName > a.clientName ? 1 : 0;
        case 'phone':
            return b.phone < a.phone ? -1 : b.phone > a.phone ? 1 : 0;
        case 'email':
            return b.email < a.email ? -1 : b.email > a.email ? 1 : 0;
        case 'id':
        default:
            return b.id < a.id ? -1 : b.id > a.id ? 1 : 0;
    }
}

function getComparator(order: SortDirection, orderBy: string) {
    return order === 'desc'
        ? (a: Ticket, b: Ticket) => descendingComparator(a, b, orderBy)
        : (a: Ticket, b: Ticket) => -descendingComparator(a, b, orderBy);
}


// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'trackingNo',
        align: 'left',
        disablePadding: false,
        label: 'Ticket Id.'
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: true,
        label: 'Client Name'
    },
    {
        id: 'status',
        align: 'left',
        disablePadding: true,
        label: 'Status'
    },
    {
        id: 'carbs',
        align: 'left',
        disablePadding: false,
        label: 'Summary'
    },
    {
        id: 'protein',
        align: 'left',
        disablePadding: false,
        label: 'Contact'
    }
];

// ==============================|| Ticket TABLE - HEADER ||============================== //
type TicketTableHeadProps = {
    order: SortDirection,
    orderBy: string
};
const TicketTableHead: React.FC<TicketTableHeadProps> = ({ order, orderBy }) => {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align as "left" | "right" | "center" | "justify" | "inherit" | undefined}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : 'desc'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

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

// ==============================|| TICKETS TABLE ||============================== //

const NUM_TIX = 10;

export default function TicketsTable() {
    const [order] = useState<SortDirection>('desc');
    const [orderBy] = useState<string>('id');
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        ticketService.getTickets(NUM_TIX)
            .then((tix) => setTickets(tix))
    }, [])

    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        '& .MuiTableCell-root:first-of-type': {
                            pl: 2
                        },
                        '& .MuiTableCell-root:last-of-type': {
                            pr: 3
                        }
                    }}
                >
                    <TicketTableHead order={order} orderBy={orderBy} />
                    <TableBody>
                        {tickets.sort(getComparator(order, orderBy))
                            .map((ticket: Ticket, index: number) => {
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        tabIndex={-1}
                                        key={index}
                                    >
                                        <TableCell component="th" id={labelId} scope="row" align="left"><TicketLink ticket={ticket} /></TableCell>
                                        <TableCell align="left">{ticket.clientName}</TableCell>
                                        <TableCell align="left"><TicketStatus ticket={ticket} /></TableCell>
                                        <TableCell align="left">{ticket.summary}</TableCell>
                                        <TableCell align="left"><TicketContact ticket={ticket} /></TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
