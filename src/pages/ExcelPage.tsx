/**
 * ExcelPage.tsx
 * Example of uploading an excel spreadsheet into DB and displaying the data


*/
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

// material-ui
import { Box, Typography } from '@mui/material';
import StaffTable from '../sections/staff/StaffTable';
import MainCard from '../components/MainCard';
import { Staff, staffService } from '../sections/staff/staffService';

// sheetJS
import { read, utils } from "xlsx";


const ExcelPage = () => {

    const [uploadMsg, setUploadMsg] = useState('');

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        const staffData = await handleParse(file)
        console.log('staffdata', staffData)
        await staffService.postStaff(staffData)
    }

    // referenced example at https://docs.sheetjs.com/docs/demos/frontend/react/
    const handleParse = async (file: any) => {
        const arrayBuffer = await file.arrayBuffer();

        const workbook = read(arrayBuffer);

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let data = utils.sheet_to_json(worksheet);

        // modify excel sheet data 
        data.map((employee) => {
            // add id and date fields
            employee.id = uuid();
            employee.created_at = new Date();
            // convert roles string into an array
            employee.roles = employee.roles.toString().split(",");
        })

        return data;
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
