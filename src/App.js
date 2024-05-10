import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Form from './Component/Form';
import NotFoundPage from './Pages/NotFoundPage';
import OrderTable from './Component/OrderTable';
import TimeLine from './Component/TimeLine';
import ReactGA from 'react-ga4';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Form />,
    errorElement: <NotFoundPage />,
  },
  { path: '/orderdetail', element: <OrderTable /> },
  { path: '/status', element: <TimeLine /> },
  { path: '*', element: <NotFoundPage /> },
]);
function App() {
  const MEASUREMENT_ID = 'G-VQXVF0L1LD';
  ReactGA.initialize(MEASUREMENT_ID);
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  return <RouterProvider router={router} />;
}

export default App;
