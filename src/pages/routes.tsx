import MainCard from '../components/MainCard';
import MainLayout from '../layout/MainLayout';
import MinimalLayout from '../layout/MinimalLayout';
import TicketsGrid from '../sections/tickets/TicketsGrid';
import TicketsTable from '../sections/tickets/TicketsTable';
import ExcelPage from '../sections/excel/ExcelPage';
import PrivacyPage from './PrivacyPage';
import TicketPage from '../sections/tickets/TicketPage';
import UploadPage from '../sections/file-storage/UploadPage';
import Login from './authentication/Login';
import Page404 from './error/404';
import SamplePage from './extra-pages/SamplePage';
import MapPage from '../sections/maps/MapPage';
import DashboardDefault from './dashboard';
import DragDropPage from '../pages/dragdrop/DragDropPage';

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
        path: "sample-page",
        element: <SamplePage />,
      },
      {
        path: "ticket/:id",
        element: <TicketPage />,
      },
      {
        path: "tickets",
        element: (
          <MainCard title="Last 100 Tickets">
            <TicketsTable count={100}/>
          </MainCard>),
      },
      {
        path: "tickets-grid",
        element: (
          <MainCard title="Tickets Page">
            <TicketsGrid />
          </MainCard>
        ),
      },
      {
        path: "privacy",
        element: <PrivacyPage />,
      },
      {
        path: "upload",
        element: <UploadPage />,
      },
      {
        path: "drag-drop",
        element: <DragDropPage />,
      },
      {
        path: "map-example",
        element: <MapPage />,
      },
      {
        path: "excel-example",
        element: <ExcelPage />
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
