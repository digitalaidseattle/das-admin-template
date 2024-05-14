/**
 *  StaffTable.tsx
 *
 *  Display a table of staff entries.
 * 
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { Staff } from "./staffService"

// material-ui
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

// ==============================|| Staff TABLE - HEADER ||============================== //

const headCells = [
    {
        id: 'id',
        align: 'left',
        disablePadding: false,
        label: 'Id'
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: false,
        label: 'Name'
    },
    {
        id: 'email',
        align: 'left',
        disablePadding: false,
        label: 'Email'
    },
    {
        id: 'roles',
        align: 'left',
        disablePadding: false,
        label: 'Roles'
    },
]

const StaffTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align as "left" | "right" | "center" | "justify" | "inherit" | undefined}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function StaffTable({ tableData }: { tableData: Staff[] }) {

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
                    }}>
                    <StaffTableHead />
                    <TableBody>
                        {tableData.map(s => (
                            <TableRow key={s.id}>
                                <TableCell align="left">{s.id}</TableCell>
                                <TableCell align="left">{s.name}</TableCell>
                                <TableCell align="left">{s.email}</TableCell>
                                <TableCell align="left">{s.roles}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    )
}