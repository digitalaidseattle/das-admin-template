/**
 *  authService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import supabaseClient from "./supabaseClient";


class TicketService {
    async getTickets(count: number): Promise<any> {
        return supabaseClient.from('service_ticket')
            .select()
            .limit(count)
            .then(tixResp => tixResp.data)
    }

    async getTicket(ticket_id: number): Promise<any> {
        return supabaseClient.from('service_ticket')
            .select('*, ticket_history(*)')
            .eq('id', ticket_id)
            .then(tixResp => tixResp.data)
    }

    async createTicket(tix: any): Promise<any> {
        tix.status = 'new';
        return supabaseClient.from('service_ticket')
            .insert(tix)
            .select()
            .then(tixResp => {
                const ticket = (tixResp.data as any)[0];
                const history = {
                    'service_ticket_id': ticket.id,
                    'description': 'New ticket'
                }
                return supabaseClient.from('ticket_history')
                    .insert(history)
                    .select()
                    .then(_histResp => {
                        return ticket
                    });
            })
    }

}

const ticketService = new TicketService()
export { ticketService };

