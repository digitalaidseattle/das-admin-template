import { describe, expect, it, vi } from 'vitest'
import supabaseClient from '../../services/supabaseClient'
import { ticketService } from './ticketService'



describe('ticketService tests', () => {

    const mockFilterBuilder = {
        limit: vi.fn(() => Promise.resolve({})),
        range: vi.fn(() => Promise.resolve({})),
        order: vi.fn(() => Promise.resolve({}))
    };

    const mockQueryBuilder = {
        select: vi.fn(() => Promise.resolve({})),
    };

    it('query', async () => {
        const LIMIT = 10;
        const response = { data: [{}], count: 5, error: null }

        const fromSpy = vi.spyOn(supabaseClient, "from")
            .mockReturnValue(mockQueryBuilder as any)
        const selectSpy = vi.spyOn(mockQueryBuilder, "select")
            .mockReturnValue(mockFilterBuilder as any)
        const rangeSpy = vi.spyOn(mockFilterBuilder, "range")
            .mockReturnValue(mockFilterBuilder as any)
        const orderSpy = vi.spyOn(mockFilterBuilder, "order")
            .mockReturnValue(Promise.resolve(response))

        const tixs = await ticketService.query(LIMIT)
        expect(fromSpy).toHaveBeenCalledWith('service_ticket')
        expect(selectSpy).toHaveBeenCalledWith('*', { count: 'exact' })
        expect(rangeSpy).toHaveBeenCalledWith(0, LIMIT-1)
        expect(orderSpy).toHaveBeenCalledWith('id', { ascending: false })
        expect(tixs.rows.length).toEqual(1);
        expect(tixs.totalRowCount).toEqual(5);
    });

    it('getTickets', async () => {
        const LIMIT = 10;
        const response = { data: [{}], error: null }

        const fromSpy = vi.spyOn(supabaseClient, "from")
            .mockReturnValue(mockQueryBuilder as any)
        const selectSpy = vi.spyOn(mockQueryBuilder, "select")
            .mockReturnValue(mockFilterBuilder as any)
        const limitSpy = vi.spyOn(mockFilterBuilder, "limit")
            .mockReturnValue(mockFilterBuilder as any)
        const orderSpy = vi.spyOn(mockFilterBuilder, "order")
            .mockReturnValue(Promise.resolve(response))

        const tixs = await ticketService.getTickets(LIMIT)
        expect(fromSpy).toHaveBeenCalledWith('service_ticket')
        expect(selectSpy).toHaveBeenCalled()
        expect(limitSpy).toHaveBeenCalledWith(LIMIT)
        expect(orderSpy).toHaveBeenCalledWith('created_at', { ascending: false })
        expect(tixs.length).toEqual(1);
    });


})
