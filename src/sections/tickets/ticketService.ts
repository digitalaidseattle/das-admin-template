/**
 *  authService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { User } from "@supabase/supabase-js";
import { EntityService } from "../../services/entityService";
import { supabaseClient } from "@digitalaidseattle/supabase";
import type { PageInfo, QueryModel } from "@digitalaidseattle/supabase";

type Ticket = {
    id: number,
    created_at: Date,
    inputSource: string,
    summary: string,
    description: string,
    status: string,
    assignee: string,
    due_date: Date,
    phone: string,
    email: string,
    clientName: string,
    ticket_history: TicketHistory[]
};

type TicketHistory = {
    service_ticket_id: number
    created_at: Date,
    description: string,
    property: string,
    value: string,
    change_by: string
};

const DEFAULT_COUNT = 100;
const TABLE_SERVICE_TICKET = 'service_ticket';

class TicketService implements EntityService<Ticket> {
    async getAll(count?: number | undefined): Promise<Ticket[]> {
        return supabaseClient.from(TABLE_SERVICE_TICKET)
            .select()
            .limit(count ?? DEFAULT_COUNT)
            .order('created_at', { ascending: false })
            .then((resp: any) => resp.data ?? [])
    }

    validateTicket(updated: Ticket): Map<string, string> {
        const map = new Map<string, string>();
        console.log(updated)
        if (updated.clientName.trim() === '') {
            map.set('clientName', 'Client name is required.')
        }
        if (updated.summary.trim() === '') {
            map.set('summary', 'Summary is required.')
        }
        return map;
    }

    async query(query: QueryModel): Promise<PageInfo<Ticket>> {
        const _offset = query.page ? query.page * query.pageSize : 0;
        return supabaseClient.from(TABLE_SERVICE_TICKET)
            .select('*', { count: 'exact' })
            .range(_offset, _offset + query.pageSize - 1)
            .order(query.sortField, { ascending: query.sortDirection === 'asc' })
            .then((resp: any) => {
                return {
                    rows: resp.data as Ticket[],
                    totalRowCount: resp.count || 0
                }
            })
    }

    async getById(ticket_id: string | undefined): Promise<Ticket> {
        return supabaseClient.from(TABLE_SERVICE_TICKET)
            .select('*, ticket_history(*)')
            .eq('id', Number(ticket_id))
            .single()
            .then((resp: any) => resp.data ?? undefined)
    }

    async create(user: User, tix: Ticket): Promise<Ticket> {
        tix.status = 'new';
        return supabaseClient.from(TABLE_SERVICE_TICKET)
            .insert(tix)
            .select()
            .single()
            .then(async (resp: any) => {
                const ticket = resp.data! as Ticket;
                const history = {
                    'service_ticket_id': ticket.id,
                    'description': 'New ticket',
                    'change_by': user.email
                }
                return this.createTicketHistory(history as TicketHistory)
                    .then(() => this.getById(ticket.id.toString()))
            })
    }

    async update(user: User, tix: Ticket, changes: Map<string, unknown>): Promise<Ticket> {
        return supabaseClient.from(TABLE_SERVICE_TICKET)
            .update(Object.fromEntries(changes.entries()))
            .eq('id', tix.id)
            .select()
            .single()
            .then(async (resp: any) => {
                const ticket = resp.data;
                const history = {
                    'service_ticket_id': tix.id,
                    'description': JSON.stringify(Array.from(changes.entries())),
                    'change_by': user.email
                }
                return this.createTicketHistory(history as TicketHistory)
                    .then(() => this.getById(ticket.id.toString()))
            })
    }

    async createTicketHistory(history: TicketHistory): Promise<TicketHistory> {
        return supabaseClient.from('ticket_history')
            .insert(history)
            .select()
            .then((resp: any) => resp.data![0] as TicketHistory);
    }
}

const ticketService = new TicketService()
export { ticketService };
export type { PageInfo, Ticket, TicketHistory };

