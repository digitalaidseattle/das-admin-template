// project import
import {
  ChromeOutlined,
  DashboardOutlined,
  LoginOutlined,
  ProfileOutlined,
  QuestionOutlined,
  ExclamationOutlined,
  FileOutlined
} from '@ant-design/icons';

const icons = {
  DashboardOutlined,
  LoginOutlined,
  ProfileOutlined,
  ChromeOutlined,
  QuestionOutlined,
  ExclamationOutlined,
  FileOutlined
};

// ==============================|| MENU ITEMS ||============================== //
const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'tickets',
      title: 'Tickets',
      type: 'item',
      url: '/tickets',
      icon: icons.FileOutlined,
      breadcrumbs: false
    }
  ]
}

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
      icon: icons.LoginOutlined
    },
    {
      id: '404',
      title: '404',
      type: 'item',
      url: '/404',
      icon: icons.ExclamationOutlined
    },
    {
      id: 'sample-page',
      title: 'Sample Page',
      type: 'item',
      url: '/sample-page',
      icon: icons.ChromeOutlined
    }
  ]
};

const menuItems = {
  items: [dashboard, pages]
};

export default menuItems;
