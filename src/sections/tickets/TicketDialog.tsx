/**
 *  App.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import React, { useContext, useState } from 'react';

// material-ui
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { ticketService } from './ticketService';
import useAppConstants from '../../services/useAppConstants';
import { UserContext } from '../../components/contexts/UserContext';


const TicketDialog: React.FC<any> = (props: { open: boolean, handleSuccess: (resp: any) => {}, handleError: () => {} }) => {

    const { user } = useContext(UserContext)
    const { data: sources } = useAppConstants('SOURCE');
    const [source, setSource] = useState("email");

    const iconBackColorOpen = 'grey.300';
    const iconBackColor = 'grey.100';

    return <Dialog
        open={props.open}
        onClose={() => props.handleSuccess(null)}
        PaperProps={{
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries((formData as any).entries());
                ticketService.createTicket(user, formJson)
                    .then((resp: any) => {
                        console.log('resp', resp);
                        props.handleSuccess(resp);
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
                sx={{ color: 'text.secondary', bgcolor: props.open ? iconBackColorOpen : iconBackColor }}
                onClick={() => props.handleSuccess(null)}>Cancel</Button>
            <Button
                variant='outlined'
                sx={{ color: 'text.success', bgcolor: props.open ? iconBackColorOpen : iconBackColor }}
                type="submit">OK</Button>
        </DialogActions>
    </Dialog>
}
export default TicketDialog;
