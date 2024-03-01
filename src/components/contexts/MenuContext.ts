/**
 *  MenuContext.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { createContext } from "react";


interface MenuContextType {
    menu: any,
    setMenu: (_menu: any) => void
}

export const MenuContext = createContext<MenuContextType>({
    menu: {},
    setMenu: () => { }
});