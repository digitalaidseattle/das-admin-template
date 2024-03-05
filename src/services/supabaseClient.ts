import { createClient } from "@supabase/supabase-js";

type PageInfo<T> = {
    totalRowCount: number
    rows: T[]
}

const supabaseClient = createClient(
    import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
);

export default supabaseClient;
export type { PageInfo }