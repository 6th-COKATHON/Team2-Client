import { createBrowserRouter } from "react-router-dom";
import { path } from "./path";
import { AuthPage, Home, Main } from "@/pages";

const AppRouter = createBrowserRouter([
  {
    path: path.dummy,
    element: <Home />,
  },
  {
    path: path.auth,
    element: <AuthPage />,
  },
  {
    path: path.main,
    element: <Main />,
  },
]);

export default AppRouter;
