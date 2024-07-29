/**
 * ExcelPage.tsx
 * Example of uploading an excel spreadsheet into DB and displaying the data


*/
import { useEffect, useState } from 'react';

// material-ui
import { AlertColor, Box, Button, Stack, Typography } from '@mui/material';
import { DASSnackbar } from '../../components/DASSnackbar';
import MainCard from '../../components/MainCard';
import { Staff, staffService } from '../../services/staffService';
import StaffTable from './StaffTable';

const ExcelPage = () => {

    type StatusMessage = {
        message: string,
        severity: AlertColor
    }

    const [status, setStatus] = useState<StatusMessage>({ message: '', severity: 'info' });

    const [staff, setStaff] = useState<Staff[]>([]);
    // newStaff state is used for rendering newly added rows separately from the rest, so we can highlight them on upload.
    const [newStaff, setNewStaff] = useState<Staff[]>([]);

    useEffect(() => {
        staffService.getStaff()
            .then(res => setStaff(res))
    }, [])

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        // get parsed array from the uploaded excel file
        const newStaffData = await staffService.handleParse(file)
            .catch(err => setStatus({ message: 'Error while parsing: ' + err.message, severity: 'error' }));
        // upload parsed data to supabase
        if (newStaffData) {
            staffService.postStaff(newStaffData)
                .then(() => {
                    // append (previously uploaded) staff to staff state, so changes are reflected in table
                    setStaff([...newStaff, ...staff]);
                    // update state with the just uploaded data
                    setNewStaff([...newStaffData])
                    setStatus({ message: 'Success! Uploaded data to staff table.', severity: 'success' })
                })
                .catch((error) => setStatus({ message: error.toString(), severity: 'error' }));
        }
    }

    const download = () => {
        staffService.download("staff.xlsx", staff)
        .then(() => {
            setStatus({ message: 'Success! Exported staff table.', severity: 'success' })
        })
    }


    return (
        <MainCard title="Excel Upload Example">
            <Typography variant="body2">
                This demo parses data from an excel file (.xlsx) that has the columns: <b>name</b>, <b>email</b>, and <b>roles</b>.
                <br />
                Try it out with <b>staff-test.xlsx</b> located in the github repository, under <b>test/resources</b>.
                <br />
                Or try downloading an excel spreadsheet.
            </Typography>
            <Stack direction={'row'} spacing={2} m={2}>
                <Box sx={{ marginY: '1rem' }}>
                    <input
                        type="file"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        id="contained-button-file"
                        onChange={(e) => handleUpload(e)}
                    />
                </Box>
                <Button variant='outlined'
                    onClick={download}>Export</Button>
            </Stack>
            <DASSnackbar
                message={status.message}
                open={status.message.length > 0}
                severity={status.severity}
                onClose={() => setStatus({ message: '', severity: 'info' })} />
            <StaffTable tableData={staff} newData={newStaff} />
        </MainCard >
    );
}

export default ExcelPage;
