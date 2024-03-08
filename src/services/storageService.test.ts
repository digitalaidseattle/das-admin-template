import { beforeEach, describe, expect, it, vi, vitest } from 'vitest';
import { storageService } from './storageService';
import { supabaseClient } from './supabaseClient';

describe('storageService tests', () => {

    const mockStorageApi = {
        download: vi.fn(() => Promise.resolve({ data: null, error: null }))
    };

    beforeEach(() => {
        vi.mock('./supabaseClient', () => ({
            __esModule: true,
            supabaseClient: () => {
                from: mockStorageApi
            }
        }));
    })

    it('downloadFile', async () => {

        // const blob = {};
        // const fromSpy = vi.spyOn(supabaseClient, 'from')
        //     .mockReturnValue(mockStorageApi as any)
        // const downloadSpy = vi.spyOn(mockStorageApi, 'download')
        //     .mockReturnValue(Promise.resolve({ data: blob, error: null }) as any)

        // const actual = await storageService.downloadFile('file')
        // expect(fromSpy).toHaveBeenCalledWith('info');
        // expect(downloadSpy).toHaveBeenCalledWith('file');
        // expect(actual).toEqual(blob);

    })


})
