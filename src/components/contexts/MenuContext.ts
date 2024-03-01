/**
 *  MenuContext.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { ChipProps } from "@mui/material";
import { ReactNode, createContext } from "react";


export type MenuItem = {
    id: string,
    title: string,
    type: string,
    children: MenuItem[],
    url: string,
    target: string,
    icon: ReactNode,
    breadcrumbs: boolean,
    disabled: boolean,
    chip: ChipProps
}


interface MenuContextType {
    menu: MenuItem | null,
    setMenu: (_menu: MenuItem) => void
}

export const MenuContext = createContext<MenuContextType>({
    menu: null,
    setMenu: () => { }
});