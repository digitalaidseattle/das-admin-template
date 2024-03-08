
/**
 *  storageService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { supabaseClient } from "./supabaseClient";

const BUCKET_NAME = 'info';

class StorageService {
    downloadFile = async (filepath: string): Promise<Blob | null> => {
        return supabaseClient
            .storage
            .from(BUCKET_NAME)
            .download(filepath)
            .then(resp => {
                if (resp.error) {
                    throw new Error(resp.error.message)
                }
                return resp.data
            })
    }

}
const storageService = new StorageService()
export { storageService }