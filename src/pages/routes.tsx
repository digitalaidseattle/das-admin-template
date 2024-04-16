import MainLayout from '../layout/MainLayout';
import MinimalLayout from '../layout/MinimalLayout';
import PrivacyPage from './PrivacyPage';
import TicketPage from './TicketPage';
import TicketsGridPage from './TicketsGridPage';
import TicketsPage from './TicketsPage';
import Login from './authentication/Login';
import DashboardDefault from './dashboard';
import Page404 from './error/404';
import SamplePage from './extra-pages/SamplePage';
import UploadPage from './UploadPage';

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <DashboardDefault />,
      },
      {
        path: "dashboard",
        element: <DashboardDefault />,
      },
      {
        path: "sample-page",
        element: <SamplePage />,
      },
      {
        path: "ticket/:id",
        element: <TicketPage />,
      },
      {
        path: "tickets",
        element: <TicketsPage />,
      },
      {
        path: "tickets-grid",
        element: <TicketsGridPage />,
      },
      {
        path: "privacy",
        element: <PrivacyPage />,
      },
      {
        path: "upload",
        element: <UploadPage />,
      }
    ]
  },
  {
    path: "/",
    element: <MinimalLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
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

export { routes };
