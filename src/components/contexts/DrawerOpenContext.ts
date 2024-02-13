/**
 *  DrawerOpenContext.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { createContext } from "react";

  
export const DrawerOpenContext = createContext({
    drawerOpen: false,
    setDrawerOpen: (_open: boolean) => {}
})
