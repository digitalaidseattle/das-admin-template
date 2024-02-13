import { lazy } from 'react';
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';
import MinimalLayout from '../layout/MinimalLayout';
import Page404 from './error/404';

const Dashboard = Loadable(lazy(() => import('./dashboard')));
const AuthLogin = Loadable(lazy(() => import('./authentication/Login')));
const SamplePage = Loadable(lazy(() => import('./extra-pages/SamplePage')));
const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,

      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "sample-page",
        element: <SamplePage />,
      }
    ]
  },
  {
    path: "/",
    element: <MinimalLayout />,
    children: [
      {
        path: 'login',
        element: <AuthLogin />
      }
    ]
  },
  {
    path: "*",
    element: <MinimalLayout />,
    children: [
      {
        path: '*',
        element: <Page404 />
      }
    ]
  }
];

export { routes }