/**
 *  staffService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { supabaseClient } from "../../services/supabaseClient";

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
        console.log('rows', rows)
        const { data, error } = await supabaseClient
            .from('staff')
            .insert(rows)
            .select()
        if (error) {
            console.error('error posting to staff table:', error)
            return
        }
        console.log('data posted to staff table:', data)
    }
}


const staffService = new StaffService()
export { staffService };
export type { Staff };
