/**
 *  authService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { User } from "@supabase/supabase-js";
import supabaseClient from "../../services/supabaseClient";

type TicketProps = {
    ticket: Ticket
};

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

class TicketService {
    async getTickets(count: number): Promise<Ticket[]> {
        return supabaseClient.from('service_ticket')
            .select()
            .limit(count)
            .order('created_at', { ascending: false })
            .then(tixResp => tixResp.data as Ticket[])
    }

    async getTicket(ticket_id: number): Promise<Ticket> {
        return supabaseClient.from('service_ticket')
            .select('*, ticket_history(*)')
            .eq('id', ticket_id)
            .single()
            .then(tixResp => tixResp.data)
    }

async createTicket(user: User, tix: Ticket): Promise<Ticket> {
        tix.status = 'new';
        return supabaseClient.from('service_ticket')
            .insert(tix)
            .select()
            .then(async tixResp => {
                const ticket = tixResp.data![0] as Ticket;
                const history = {
                    'service_ticket_id': ticket.id,
                    'description': 'New ticket',
                    'change_by': user.email
                }
                await this.createTicketHistory(history as TicketHistory);
                return ticket;
            })
    }

    async createTicketHistory(history: TicketHistory): Promise<TicketHistory> {
        return supabaseClient.from('ticket_history')
            .insert(history)
            .select()
            .then(histResp => histResp.data![0] as TicketHistory);
    }
}

const ticketService = new TicketService()
export { ticketService };
export type { TicketProps, Ticket, TicketHistory };

