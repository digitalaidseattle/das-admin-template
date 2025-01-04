import { supabaseClient } from "@digitalaidseattle/supabase";
import { staffService, Staff } from './staffService';
import { beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import { v4 as uuid } from 'uuid';
import { read, utils, WorkBook, write } from "xlsx";
import { saveAs } from 'file-saver';

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

    vi.mock('xlsx', () => ({
        read: vi.fn(),
        write: vi.fn(),
        utils: {
            sheet_to_json: vi.fn(),
            book_new: vi.fn(),
            json_to_sheet: vi.fn(),
            book_append_sheet: vi.fn()
        }
    }));

    vi.mock('uuid', () => ({
        v4: vi.fn()
    }));

    vi.mock('file-saver', () => ({
        saveAs: vi.fn()
    }))

    it('handleParse', async () => {

        const mockArrayBuffer = new ArrayBuffer(8);
        const mockSheetData = [
            { name: 'John Lawyer', roles: 'lawyer,writer' },
        ];
        const mockFile = {
            arrayBuffer: () => Promise.resolve(mockArrayBuffer)
        } as unknown as File;

        // mock workbook is returned from read()
        (read as any).mockReturnValue({ Sheets: { 'Sheet1': {} }, SheetNames: ['Sheet1'] });

        // mock parsed data is returned from utils.sheet_to_json()
        (utils.sheet_to_json as any).mockReturnValue(mockSheetData);

        (uuid as any).mockReturnValue('123');

        const result = await staffService.handleParse(mockFile);

        // test if file has been converted to array of Staff objects
        expectTypeOf(result).toEqualTypeOf<Staff[]>()

        // test array modification
        expect(result[0].id).toBe('123');
        expect(result[0].roles).toEqual(['lawyer', 'writer']);
        expect(result[0].created_at).toBeInstanceOf(Date);
    })

    it('download', async () => {

        const mockArrayBuffer = new ArrayBuffer(8);
        const mockSheetData: any[] = [];
        const mockWorkbook = {} as WorkBook;

        (utils.json_to_sheet as any).mockReturnValue(mockSheetData);
        (utils.book_new as any).mockReturnValue(mockWorkbook);
        (write as any).mockReturnValue(mockArrayBuffer);

        const mockData: any[] = [];
        staffService.download('test', mockData)
            .then(resp => {
                expect(utils.json_to_sheet).toBeCalledWith(mockData);
                expect(utils.book_append_sheet).toBeCalledWith(mockWorkbook, mockSheetData);
                expect(write).toBeCalledWith(mockWorkbook, { bookType: 'xlsx', type: 'array' });
                expect(saveAs).toBeCalledWith(expect.anything(), 'test');
                expect(resp).toBe(true)
            })

    })
})
