import { useEffect, useRef, useState } from "react";
import supabaseClient from "./supabaseClient";


const useAppConstants = (type: string) => {
    const cache: any = useRef({});
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setStatus('fetching');
            if (cache[type]) {
                const data = cache[type];
                setData(data);
                setStatus('fetched');
            } else {
                const response = await supabaseClient.from('app_constants')
                    .select()
                    .eq('type', type);
                const data = response.data;
                cache[type] = data; // set response in cache;
                setData(data as []);
                setStatus('fetched');
            }
        };

        fetchData();
    }, []);

    return { status, data };
};

export default useAppConstants;