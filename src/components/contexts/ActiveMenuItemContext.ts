/**
 *  ActiveMenuItemContext.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { createContext } from "react";


interface MenuItemContextType {
    activeMenuItem: string;
    setActiveMenuItem: (menuItem: string) => void;
}

export const ActiveMenuItemContext = createContext<MenuItemContextType>({
    activeMenuItem: '',
    setActiveMenuItem: () => { }
});

