import { beforeEach, describe, expect, it, vi } from 'vitest';
import { storageService } from './storageService';
import { supabaseClient } from './supabaseClient';

describe('storageService tests', () => {

    beforeEach(() => {
        vi.mock('./supabaseClient', () => ({
            supabaseClient: {
                storage: {
                    from: vi.fn()
                }
            }
        }))
    });

    it('downloadFile', async () => {
        const mockStorageApi = {
            download: vi.fn()
        };

        const blob = {};
        const fromSpy = vi.spyOn(supabaseClient.storage, 'from')
            .mockReturnValue(mockStorageApi as any)
        const downloadSpy = vi.spyOn(mockStorageApi, 'download')
            .mockReturnValue(Promise.resolve({ data: blob, error: null }) as any)

        const actual = await storageService.downloadFile('file')
        expect(fromSpy).toHaveBeenCalledWith('info');
        expect(downloadSpy).toHaveBeenCalledWith('file');
        expect(actual).toEqual(blob);
    })

    it('downloadFile - error', async () => {
        const mockStorageApi = {
            download: vi.fn()
        };

        const blob = {};
        const fromSpy = vi.spyOn(supabaseClient.storage, 'from')
            .mockReturnValue(mockStorageApi as any)
        const downloadSpy = vi.spyOn(mockStorageApi, 'download')
            .mockReturnValue(Promise.resolve({ data: blob, error: { resp: { message: 'boom' } } }) as any)

        try {
            await storageService.downloadFile('file')
        } catch (actual) {
            expect(fromSpy).toHaveBeenCalledWith('info');
            expect(downloadSpy).toHaveBeenCalledWith('file');
        }
    })


})
