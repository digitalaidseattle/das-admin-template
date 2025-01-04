import DragDropPage from '../pages/dragdrop/DragDropPage';
import CalendarPage from '../sections/calendar/CalendarPage';
import ExcelPage from '../sections/excel/ExcelPage';
import UploadPage from '../sections/file-storage/UploadPage';
import MapPage from '../sections/maps/MapPage';
import TicketPage from '../sections/tickets/TicketPage';
import TicketsGrid from '../sections/tickets/TicketsGrid';
import TicketsTable from '../sections/tickets/TicketsTable';
import DashboardDefault from './dashboard';
import SamplePage from './extra-pages/SamplePage';

import {
  Error,
  Login,
  MainCard,
  MainLayout,
  MarkdownPage,
  MinimalLayout
} from "@digitalaidseattle/mui";

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
        element: <MarkdownPage  filepath='privacy.md'/>,
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
      },
      {
        path: "calendar-example",
        element: <CalendarPage />
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
        element: <Error />
      }
    ]
  }
];

export { routes };
