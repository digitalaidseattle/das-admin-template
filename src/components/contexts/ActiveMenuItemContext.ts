/**
 *  ActiveMenuItemContext.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { createContext } from "react";

  
export const ActiveMenuItemContext = createContext({
    activeMenuItem: 'string',
    setActiveMenuItem: (_item: any) => {}
})
