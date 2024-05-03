/**
 * ExcelPage.tsx
 * Example of uploading an excel spreadsheet into DB and displaying the data


*/
import { useState } from 'react';
import { storageService } from '../services/storageService';

// material-ui
import { Box, Typography } from '@mui/material';
import StaffTable from '../sections/staff/StaffTable';
import MainCard from '../components/MainCard';

const ExcelPage = () => {

    const [uploadMsg, setUploadMsg] = useState('');

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        storageService.uploadFile(file)
            .then(() => setUploadMsg('File has been uploaded.'))
            .catch(err => alert(err));
    }

    return (
        <MainCard title="Excel Upload Example">
            <Typography variant="body2">
                Upload an excel file (.xlsx) to the database and populate the staff table below.
                <Box sx={{ marginY: '1rem' }}>
                    <input
                        accept="*"
                        id="contained-button-file"
                        type="file"
                        onChange={(e) => handleUpload(e)}
                    />
                </Box>
                <Typography variant="body2">{uploadMsg.length > 0 && uploadMsg}</Typography>
            </Typography>
            <StaffTable />
        </MainCard>
    );
}

export default ExcelPage;
