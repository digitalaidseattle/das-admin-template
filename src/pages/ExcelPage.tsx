/**
 * ExcelPage.tsx
 * Example of uploading an excel spreadsheet into DB and displaying the data


*/
import { useState } from 'react';

// material-ui
import { Box, Typography } from '@mui/material';
import StaffTable from '../sections/staff/StaffTable';
import MainCard from '../components/MainCard';
import { Staff, staffService } from '../sections/staff/staffService';

// sheetJS
import { read, utils } from "xlsx";


const ExcelPage = () => {

    const [staff, setStaff] = useState<Staff[]>([]);
    const [uploadMsg, setUploadMsg] = useState('');

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        handleParse(file)
            .then(() => staffService.postStaff(staff))
            .then(() => setUploadMsg('File has been parsed.'))
            .catch(err => alert(err));
    }

    // referenced example at https://docs.sheetjs.com/docs/demos/frontend/react/
    const handleParse = async (file: any) => {
        const arrayBuffer = await file.arrayBuffer();

        const workbook = read(arrayBuffer);

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data: Staff[] = utils.sheet_to_json<Staff>(worksheet);

        setStaff(data);
    }

    return (
        <MainCard title="Excel Upload Example">
            <Typography variant="body2">
                Upload an excel file (.xlsx) to populate the staff table below.
                <Box sx={{ marginY: '1rem' }}>
                    <input
                        type="file"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        id="contained-button-file"
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
