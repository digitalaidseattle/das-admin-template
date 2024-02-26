/**
 *  authService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import supabaseClient from "../../services/supabaseClient";

type TicketProps = {
    ticket: any
};

class TicketService {
    async getTickets(count: number): Promise<any> {
        return supabaseClient.from('service_ticket')
            .select()
            .limit(count)
            .order('created_at', { ascending: false })
            .then(tixResp => tixResp.data)
    }

    async getTicket(ticket_id: number): Promise<any> {
        return supabaseClient.from('service_ticket')
            .select('*, ticket_history(*)')
            .eq('id', ticket_id)
            .single()
            .then(tixResp => tixResp.data)
    }

    async createTicket(user: any, tix: any): Promise<any> {
        tix.status = 'new';
        return supabaseClient.from('service_ticket')
            .insert(tix)
            .select()
            .then(tixResp => {
                const ticket = (tixResp.data as any)[0];
                const history = {
                    'service_ticket_id': ticket.id,
                    'description': 'New ticket',
                    'change_by': user.email
                }
                return this.createTicketHistory(history)
                    .then(_histResp => {
                        // return ticket instead of
                        return ticket
                    });
            })
    }

    async createTicketHistory(history: any): Promise<any> {

        return supabaseClient.from('ticket_history')
            .insert(history)
            .select()
            .then(histResp => histResp.data);
    }
}

const ticketService = new TicketService()
export { ticketService };
export type { TicketProps };

