/**
 *  DrawerOpenContext.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { createContext } from "react";

  
export const OpenMenuItemsContext = createContext({
    openMenuItems: ['dashboard'],
    setOpenMenuItems: (_item: string[]) => {},
})
