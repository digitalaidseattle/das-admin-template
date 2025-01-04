/**
 *  authService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { User } from "@supabase/supabase-js";
import { EntityService } from "../../services/entityService";
import {
    supabaseClient
} from '@digitalaidseattle/supabase';

type Staff = {
    id: number,
    created_at: Date,
    name: string,
    email: string,
    roles: string,
};

const DEFAULT_COUNT = 100;
const TABLE_STAFF = 'staff';

class StaffService implements EntityService<Staff> {
    async getAll(count?: number | undefined): Promise<Staff[]> {
        return supabaseClient.from(TABLE_STAFF)
            .select()
            .limit(count ?? DEFAULT_COUNT)
            .order('created_at', { ascending: false })
            .then((resp: any) => resp.data ?? [])
    }

    async getById(id: string | undefined): Promise<Staff> {
        return supabaseClient.from(TABLE_STAFF)
            .select('*')
            .eq('id', id)
            .single()
            .then((resp: any) => resp.data ?? undefined)
    }

    async create(_user: User, staff: Staff): Promise<Staff> {
        return supabaseClient.from(TABLE_STAFF)
            .insert(staff)
            .select()
            .single()
            .then((resp: any) => resp.data)
    }

    async update(_user: User, staff: Staff, changes: Map<string, unknown>): Promise<Staff> {
        return supabaseClient.from(TABLE_STAFF)
            .update(changes)
            .eq('id', staff.id)
            .select()
            .single()
            .then((resp: any) => resp.data)
    }

}

const staffService = new StaffService()
export { staffService };
export type { Staff };

