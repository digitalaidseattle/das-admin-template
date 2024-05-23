/**
 * ExcelPage.tsx
 * Example of uploading an excel spreadsheet into DB and displaying the data


*/
import { useState, useEffect } from 'react';
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

    const [staff, setStaff] = useState<Staff[]>([]);

    useEffect(() => {
        staffService.getStaff()
            .then(res => setStaff(res))
    }, [])

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        // get parsed array from the uploaded excel file
        const newStaffData = await handleParse(file)
        // upload parsed data to supabase
        staffService.postStaff(newStaffData)
            .catch((error) => setUploadMsg('Error: ' + error));
        // append data to state, so changes are reflected in table
        setStaff([...staff, ...newStaffData]);
    }

    // referenced example at https://docs.sheetjs.com/docs/demos/frontend/react/
    const handleParse = async (file: File) => {
        const arrayBuffer = await file.arrayBuffer();

        const workbook = read(arrayBuffer);

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data: Staff[] = utils.sheet_to_json(worksheet);

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
                Upload an excel file (.xlsx) to populate the staff table below.<br />
                This demo parses data from a table that has the columns: <b>name</b>, <b>email</b>, and <b>roles</b>.
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
            <StaffTable tableData={staff} />
        </MainCard>
    );
}

export default ExcelPage;
