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
        const { error } = await supabaseClient
            .from('staff')
            .insert(rows)
            .select()
        if (error) {
            throw new Error(error.message);
        }
    }
}


const staffService = new StaffService()
export { staffService };
export type { Staff };
