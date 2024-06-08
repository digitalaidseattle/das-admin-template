import { supabaseClient } from './supabaseClient'
import { staffService, Staff } from './staffService';
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
        const mockDB = {
            select: vi.fn(),
        }
        const blob = {};
        // setting the return values for the mocked from() and select().
        const fromSpy = vi.spyOn(supabaseClient, 'from')
            .mockReturnValue(mockDB as any)
        const selectSpy = vi.spyOn(mockDB, 'select')
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
        const mockDB = {
            select: vi.fn(),
        }
        const blob = {};
        const fromSpy = vi.spyOn(supabaseClient, 'from')
            .mockReturnValue(mockDB as any)
        // mock select returns an object with an error field
        const selectSpy = vi.spyOn(mockDB, 'select')
            .mockReturnValue(Promise.resolve({ data: blob, error: { message: 'boom' } }) as any)
        // make sure that getStaff catches errors
        try {
            await staffService.getStaff()
        } catch (error) {
            expect(fromSpy).toHaveBeenCalledWith('staff');
            expect(selectSpy).toHaveBeenCalled();
        }
    })

    it('postStaff', async () => {
        const mockTable = {
            insert: vi.fn()
        }
        const mockDB = {
            select: vi.fn(),
        }
        const blob: Staff[] = [];
        const fromSpy = vi.spyOn(supabaseClient, 'from')
            .mockReturnValue(mockTable as any)
        const insertSpy = vi.spyOn(mockTable, 'insert')
            .mockReturnValue(mockDB as any)
        const selectSpy = vi.spyOn(mockDB, 'select')
            .mockReturnValue(Promise.resolve({ data: blob, error: null }) as any)

        const actual = await staffService.postStaff(blob)

        expect(fromSpy).toHaveBeenCalledWith('staff');
        expect(insertSpy).toHaveBeenCalled();
        expect(selectSpy).toHaveBeenCalled();

        expect(actual).toEqual(blob);
    })

    it('postStaff - error', async () => {
        const mockTable = {
            insert: vi.fn()
        }
        const mockDB = {
            select: vi.fn(),
        }
        const blob: Staff[] = [];
        const fromSpy = vi.spyOn(supabaseClient, 'from')
            .mockReturnValue(mockTable as any)
        const insertSpy = vi.spyOn(mockTable, 'insert')
            .mockReturnValue(mockDB as any)
        const selectSpy = vi.spyOn(mockDB, 'select')
            .mockReturnValue(Promise.resolve({ data: blob, error: { message: 'oops' } }) as any)

        try {
            await staffService.postStaff(blob)
        } catch (error) {
            expect(fromSpy).toHaveBeenCalledWith('staff');
            expect(insertSpy).toHaveBeenCalled();
            expect(selectSpy).toHaveBeenCalled();
        }
    })
})
