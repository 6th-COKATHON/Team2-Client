import { createBrowserRouter } from "react-router-dom";
import { path } from "./path";
import { AuthPage, Home } from "@/pages";

const AppRouter = createBrowserRouter([
  {
    path: path.dummy,
    element: <Home />,
  },
  {
    path: path.auth,
    element: <AuthPage />,
  },
]);

export default AppRouter;
