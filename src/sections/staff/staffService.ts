/**
 *  staffService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { supabaseClient } from "../../services/supabaseClient";
import { v4 as uuid } from 'uuid';
import { read, utils } from "xlsx";

type Staff = {
    id: string,
    created_at: Date,
    name: string,
    email: string,
    roles: string[],
}

class StaffService {
    async getStaff(): Promise<Staff[]> {
        return supabaseClient.from('staff')
            .select()
            .then(res => res.data as Staff[])
    }

    async postStaff(rows: Staff[]) {
        const { error } = await supabaseClient
            .from('staff')
            .insert(rows)
            .select()
        if (error) {
            throw new Error(error.message);
        }
    }

    // referenced example at https://docs.sheetjs.com/docs/demos/frontend/react/
    async handleParse(file: File) {
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
}


const staffService = new StaffService()
export { staffService };
export type { Staff };
