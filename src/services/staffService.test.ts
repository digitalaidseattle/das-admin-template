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
                insert: vi.fn()
            }
        }))
    })

    it('getStaff', async () => {
        const mockClient = {
            select: vi.fn(),
        }

        const blob = {};
        const fromSpy = vi.spyOn(supabaseClient, 'from')
            .mockReturnValue(mockClient as any)
        const selectSpy = vi.spyOn(mockClient, 'select')
            .mockReturnValue(Promise.resolve({ data: blob, error: null }) as any)

        const actual = await staffService.getStaff();
        expect(fromSpy).toHaveBeenCalledWith('staff');
        expect(selectSpy).toHaveBeenCalled();
        expect(actual).toEqual(blob);

    })

})
