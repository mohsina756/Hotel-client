import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Components/Home";
import Rooms from "./Components/Rooms";
import Details from "./Components/Details";
import Booked from "./Components/Booked";
import Login from "./Components/Login";
import Provider from "./Components/ContextProvider/Provider";
import Register from "./Components/Register";
import Private from "./Components/Private";
import Error from "./Components/Shared/Error";
import Aos from "aos";

import "aos/dist/aos.css";
Aos.init();
Aos.refresh();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("http://localhost:5000/room"),
      },
      {
        path: "/room",
        element: <Rooms />,
        loader: () => fetch("http://localhost:5000/room"),
      },
      {
        path: "/room/details/:id",
        element: <Details />,

        loader: ({ params }) =>
          fetch(
            `http://localhost:5000/room/details/${params.id}`,
            {
              credentials: "include",
            }
          ),
      },
      {
        path: "/booked",
        element: (
          <Private>
            <Booked />
          </Private>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
