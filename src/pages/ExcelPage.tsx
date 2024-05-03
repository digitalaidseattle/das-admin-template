/**
 * ExcelPage.tsx
 * Example of uploading an excel spreadsheet into DB and displaying the data


*/
// material-ui
import { Typography } from '@mui/material';
import StaffTable from '../sections/staff/StaffTable';
import MainCard from '../components/MainCard';

const ExcelPage = () => {

    return (
        <MainCard title="Excel Upload Example">
            <Typography variant="body2">
                Upload an excel file (.xlsx) to the database and populate the staff table below.
            </Typography>
            <StaffTable />
        </MainCard>
    );
}

export default ExcelPage;
