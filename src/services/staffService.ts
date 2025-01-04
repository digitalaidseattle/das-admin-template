/**
 *  staffService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { v4 as uuid } from 'uuid';
import { read, write, utils } from "xlsx";
import { saveAs } from 'file-saver';
import { supabaseClient } from "@digitalaidseattle/supabase";

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
            .then((res: PostgrestSingleResponse<Staff[]>) => {
                if (res.error) {
                    throw new Error(res.error.message)
                }
                return res.data as Staff[]
            })
    }

    async postStaff(rows: Staff[]): Promise<Staff[]> {
        return supabaseClient.from('staff')
            .insert(rows)
            .select()
            .then((res: PostgrestSingleResponse<Staff[]>) => {
                if (res.error) {
                    throw new Error(res.error.message)
                }
                return res.data as Staff[]
            })
    }

    // referenced example at https://docs.sheetjs.com/docs/demos/frontend/react/
    async handleParse(file: File): Promise<Staff[]> {
        // converts worksheet to an array
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


    async download(fileName: string, data: any): Promise<boolean> {
        const workbook = utils.book_new();

        const sheet = utils.json_to_sheet(data)
        utils.book_append_sheet(workbook, sheet);

        const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, `${fileName}`);
        return true;
    }
}


const staffService = new StaffService()
export { staffService };
export type { Staff };
