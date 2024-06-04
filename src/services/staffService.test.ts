/*
to learn:
[x] unit test basics
[] vitest basics

what to test:
[] getStaff: are we able to fetch from staff table with a success code?
[] postStaff: are we able to post to staff table with a success code? be sure to cleanup
[] handleParse: given an excel sheet, are we getting an array back?
*/
import { supabaseClient } from './supabaseClient'
import { staffService } from './staffService';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('staff service tests', () => {

    // runs before each test
    beforeEach(() => {
        // replaces all modules imported from this path with the provided module, for mocking the supabase client
        vi.mock('./supabaseClient', () => ({
            // a mock supabase client
            supabaseClient: {
                from: vi.fn(),
            }
        }))
    })

    it('getStaff', async () => {
        const mockClient = {
            select: vi.fn(),
        }
        const blob = {};
        // mocking .from() and .select(), setting their return values.
        const fromSpy = vi.spyOn(supabaseClient, 'from')
            .mockReturnValue(mockClient as any)
        const selectSpy = vi.spyOn(mockClient, 'select')
            .mockReturnValue(Promise.resolve({ data: blob, error: null }) as any)

        // when the service is called, the mock functions are used in place of the real ones
        const actual = await staffService.getStaff();
        // make sure from is called with the 'staff' table as argument
        expect(fromSpy).toHaveBeenCalledWith('staff');
        // make sure select was called
        expect(selectSpy).toHaveBeenCalled();
        expect(actual).toEqual(blob);
    })

    it('getStaff - error', async () => {
        const mockClient = {
            select: vi.fn(),
        }
        const blob = {};
        const fromSpy = vi.spyOn(supabaseClient, 'from')
            .mockReturnValue(mockClient as any)
        // mock select returns an object with an error field
        const selectSpy = vi.spyOn(mockClient, 'select')
            .mockReturnValue(Promise.resolve({ data: blob, error: { message: 'boom' } }) as any)

        // make sure that getStaff catches errors
        try {
            await staffService.getStaff()
        } catch (actual) {
            expect(fromSpy).toHaveBeenCalledWith('staff');
            expect(selectSpy).toHaveBeenCalled();
        }
    })

})
