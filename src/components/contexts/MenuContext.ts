/**
 *  MenuContext.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { createContext } from "react";

  
export const MenuContext = createContext({
    menu: {},
    setMenu: (_menu: any) => {}
})
