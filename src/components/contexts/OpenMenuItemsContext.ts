/**
 *  DrawerOpenContext.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { createContext } from "react";

interface OpenMenuItemsContextType {
    openMenuItems: string[];
    setOpenMenuItems: (items: string[]) => void;
}

export const OpenMenuItemsContext = createContext<OpenMenuItemsContextType>({
    openMenuItems: ['dashboard'],
    setOpenMenuItems: (_item: string[]) => { }
});

