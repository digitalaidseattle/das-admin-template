/**
 * ExcelPage.tsx
 * Example of uploading an excel spreadsheet into DB and displaying the data


*/
import { useState, useEffect } from 'react';

// material-ui
import { Box, Typography } from '@mui/material';
import StaffTable from '../sections/staff/StaffTable';
import MainCard from '../components/MainCard';
import { Staff, staffService } from '../sections/staff/staffService';

const ExcelPage = () => {

    const [uploadStatus, setUploadStatus] = useState('');

    const [staff, setStaff] = useState<Staff[]>([]);

    useEffect(() => {
        staffService.getStaff()
            .then(res => setStaff(res))
    }, [])

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        // get parsed array from the uploaded excel file
        const newStaffData = await staffService.handleParse(file)
            .catch(err => setUploadStatus('Error while parsing: ' + err.message));
        // upload parsed data to supabase
        if (newStaffData) {
            staffService.postStaff(newStaffData)
                .then(() => {
                    // append data to state, so changes are reflected in table
                    setStaff([...staff, ...newStaffData]);
                    setUploadStatus('Success! Uploaded data to staff table.')
                })
                .catch((error) => setUploadStatus(error.toString()));
        }
    }

    return (
        <MainCard title="Excel Upload Example">
            <Typography variant="body2">
                This demo parses data from an excel file (.xlsx) that has the columns: <b>name</b>, <b>email</b>, and <b>roles</b>.
                <br />
                Try it out with <b>staff-test.xlsx</b> located in the github repository, under <b>test/resources</b>.
                <Box sx={{ marginY: '1rem' }}>
                    <input
                        type="file"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        id="contained-button-file"
                        onChange={(e) => handleUpload(e)}
                    />
                </Box>
                <Typography variant="body2">{uploadStatus.length > 0 && uploadStatus}</Typography>
            </Typography>
            <StaffTable tableData={staff} />
        </MainCard>
    );
}

export default ExcelPage;
