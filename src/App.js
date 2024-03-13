import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Form from "./Component/Form";
import NotFoundPage from "./Pages/NotFoundPage";
import OrderTable from "./Component/OrderTable";
import TimeLine from "./Component/TimeLine";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Form />,
    errorElement: <NotFoundPage />,
  },
  { path: "/orderdetail", element: <OrderTable /> },
  { path: "/status", element: <TimeLine /> },
  { path: "*", element: <NotFoundPage /> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
