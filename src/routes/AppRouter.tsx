import { createBrowserRouter } from "react-router-dom";
import { path } from "./path";
import { Home } from "@/pages";

const AppRouter = createBrowserRouter([
  {
    path: path.dummy,
    element: <Home />,
  },
]);

export default AppRouter;
