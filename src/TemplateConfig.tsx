

import {
    CalendarOutlined,
    ChromeOutlined,
    DashboardOutlined,
    DragOutlined,
    ExclamationOutlined,
    EyeInvisibleOutlined,
    FileExclamationOutlined,
    FileOutlined,
    GlobalOutlined,
    LoginOutlined,
    TableOutlined,
    UploadOutlined
} from '@ant-design/icons';
import logo from "./assets/images/logo-light-icon.svg";

import { LayoutConfiguration, MenuItem } from "@digitalaidseattle/mui";
import Notification from "./Notification";

export const TemplateConfig = (): LayoutConfiguration => {
    const dashboard = {
        id: 'group-dashboard',
        title: 'Navigation',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'item',
                url: '/',
                icon: <DashboardOutlined />
            },
            {
                id: 'tickets',
                title: 'Tickets',
                type: 'item',
                url: '/tickets',
                icon: <FileOutlined />
            },
            {
                id: 'tickets-grid',
                title: 'Advanced Tickets Table',
                type: 'item',
                url: '/tickets-grid',
                icon: <FileExclamationOutlined />
            }
        ]
    } as MenuItem;

    const pages = {
        id: 'example',
        title: 'Examples',
        type: 'group',
        children: [
            {
                id: 'login1',
                title: 'Login',
                type: 'item',
                url: '/login',
                icon: <LoginOutlined />
            } as MenuItem,
            {
                id: '404',
                title: '404',
                type: 'item',
                url: '/404',
                icon: <ExclamationOutlined />
            } as MenuItem,
            {
                id: 'sample-page',
                title: 'Sample Page',
                type: 'item',
                url: '/sample-page',
                icon: <ChromeOutlined />
            } as MenuItem,
            {
                id: 'privacy-page',
                title: 'Privacy Page',
                type: 'item',
                url: '/privacy',
                icon: <EyeInvisibleOutlined />
            } as MenuItem,
            {
                id: 'upload-page',
                title: 'Upload Page',
                type: 'item',
                url: '/upload',
                icon: <UploadOutlined />
            } as MenuItem,
            {
                id: 'drag-drop-page',
                title: 'Drag Drop Page',
                type: 'item',
                url: '/drag-drop',
                icon: <DragOutlined />
            } as MenuItem,
            {
                id: 'map-example-page',
                title: 'Map Example Page',
                type: 'item',
                url: '/map-example',
                icon: <GlobalOutlined />
            } as MenuItem,
            {
                id: 'excel-example-page',
                title: 'Excel Example Page',
                type: 'item',
                url: '/excel-example',
                icon: <TableOutlined />
            } as MenuItem,
            {
                id: 'calendar-example-page',
                title: 'Calendar Example Page',
                type: 'item',
                url: '/calendar-example',
                icon: <CalendarOutlined />
            } as MenuItem
        ]
    } as MenuItem;

    return ({
        appName: 'DAS',
        logoUrl: logo,
        drawerWidth: 240,
        menuItems: [dashboard, pages],
        toolbarItems: [
            <Notification key={1} />
        ]
    })
}