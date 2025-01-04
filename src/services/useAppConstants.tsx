/**
 *  appConstant.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 * 
 * Component to cache lookup values
 *
 */
import { useEffect, useState } from "react";
import { loggingService } from "./loggingService";
import { supabaseClient } from "@digitalaidseattle/supabase";

export type AppConstant = {
    value: string,
    label: string
}
const cache: Record<string, AppConstant[]> = {}

const useAppConstants = (type: string) => {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState<AppConstant[]>([]);

    useEffect(() => {
        fetchData();
    }, [type]);

    const fetchData = () => {
        setStatus('fetching');
        if (cache[type]) {
            const data = cache[type];
            setData(data);
            setStatus('fetched');
        } else {
            supabaseClient.from('app_constants')
                .select()
                .eq('type', type)
                .then((resp: any) => {
                    console.log('response', resp)
                    if (resp.data) {
                        const data = resp.data as AppConstant[];
                        cache[type] = data;
                        setData(data);
                        setStatus('fetched');
                    } else {
                        loggingService.error(resp.statusText)
                        setData([]);
                        setStatus('fetched');
                    }
                })
        }
    };

    return { status, data };
};

export default useAppConstants;