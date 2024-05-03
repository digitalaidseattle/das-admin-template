/**
 *  staffService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { supabaseClient } from "../../services/supabaseClient";

type Staff = {
    id: number,
    created_at: Date,
    name: string,
    email: string,
    roles: string,
}

class StaffService {
    async getStaff(): Promise<Staff[]> {
        return supabaseClient.from('staff')
            .select()
            .then(res => res.data as Staff[])
    }

    async postStaff(rows: Staff[]) {
        await supabaseClient.from('staff')
            .insert(rows)
    }
}


const staffService = new StaffService()
export { staffService };
export type { Staff };
