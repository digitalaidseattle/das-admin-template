/**
 *  UserContext.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { User } from "@supabase/supabase-js";
import { createContext } from "react";

  
export const UserContext = createContext({
    user: null as unknown as User,
    setUser: (_user: User) => {},
})
