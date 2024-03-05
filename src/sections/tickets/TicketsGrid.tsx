/**
 * TicketsGrid.tsx
 * 
 * Example of integrating tickets with data-grid
 */
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridSortModel,
    useGridApiRef
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

// material-ui
import {
    Box, Button, Stack
} from '@mui/material';

// third-party

// project import
import useAppConstants, { AppConstant } from '../../services/useAppConstants';
import { TicketContact, TicketLink, TicketStatus } from './TableUtils';
import { PageInfo, Ticket, ticketService } from './ticketService';
import { QueryModel } from '../../services/supabaseClient';


// ==============================|| Tickets Grid ||============================== //

const PAGE_SIZE = 5;

const getColumns = (statuses: AppConstant[]): GridColDef[] => {
    return [
        {
            field: 'id', headerName: 'ID', width: 90,
            renderCell: (params: GridRenderCellParams<Ticket, string>) => (
                <TicketLink ticket={params.row!} />
            )
        },
        {
            field: 'clientName',
            headerName: 'Client Name',
            width: 150,
        },
        {
            field: 'email',
            headerName: 'Contact',
            width: 200,
            renderCell: (params: GridRenderCellParams<Ticket, string>) => (
                <TicketContact ticket={params.row!} />
            )
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 140,
            renderCell: (params: GridRenderCellParams<Ticket, string>) => (
                <TicketStatus ticket={params.row!} />
            ),
            type: "singleSelect",
            valueOptions: statuses
        },
        {
            field: 'assignee',
            headerName: 'Assigned To',
            width: 160,
        },
        {
            field: 'summary',
            headerName: 'summary',
            width: 160,
        }
    ];
}

export default function TicketsGrid() {
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: PAGE_SIZE });
    const [sortModel, setSortModel] = useState<GridSortModel>([{ field: 'created_at', sort: 'desc' }])
    const [pageInfo, setPageInfo] = useState<PageInfo<Ticket>>({ rows: [], totalRowCount: 0 });
    const [rowCountState, setRowCountState] = useState(pageInfo?.totalRowCount || 0,);
    const apiRef = useGridApiRef();
    const { data: statuses } = useAppConstants('STATUS')

    useEffect(() => {
        setRowCountState((prevRowCountState: number) =>
            pageInfo?.totalRowCount !== undefined
                ? pageInfo?.totalRowCount
                : prevRowCountState,
        );
    }, [pageInfo?.totalRowCount, setRowCountState]);

    useEffect(() => {
        if (paginationModel && sortModel) {
            const queryModel = {
                page: paginationModel.page,
                pageSize: paginationModel.pageSize,
                sortField: sortModel.length === 0 ? 'created_at' : sortModel[0].field,
                sortDirection: sortModel.length === 0 ? 'created_at' : sortModel[0].sort
            } as QueryModel
            ticketService.query(queryModel)
                .then((pi) => setPageInfo(pi))
        }
    }, [paginationModel, sortModel])

    const applyAction = () => {
        const rows = apiRef.current.getSelectedRows();
        const items = Array.from(rows.values());
        alert(`Apply some action to ${items.length} items.`)
    }
    return (
        <Box>
            <Stack direction="row"
                justifyContent={'space-between'}>
                <Button
                    title='Action'
                    variant="outlined"
                    color="secondary"
                    onClick={applyAction}>
                    {'Action'}
                </Button>
            </Stack>
            <DataGrid
                apiRef={apiRef}
                rows={pageInfo.rows}
                columns={getColumns(statuses)}

                paginationMode='server'
                paginationModel={paginationModel}
                rowCount={rowCountState}
                onPaginationModelChange={setPaginationModel}

                sortingMode='server'
                sortModel={sortModel}
                onSortModelChange={setSortModel}

                pageSizeOptions={[5, 10, 25, 100]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}
