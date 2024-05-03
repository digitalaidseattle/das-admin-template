/**
 * ExcelPage.tsx
 * Example of uploading an excel spreadsheet into DB and displaying the data


*/
// material-ui
import { Grid } from '@mui/material';
import StaffTable from '../sections/staff/StaffTable';

const ExcelPage = () => {

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item>
                <StaffTable />
            </Grid>
        </Grid>
    );
}

export default ExcelPage;
