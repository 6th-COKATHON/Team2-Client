import { createBrowserRouter } from "react-router-dom";
import { path } from "./path";
import { ArticleDetail, AuthPage, Home, Main } from "@/pages";

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
  {
    path: path.deatil,
    element: <ArticleDetail />,
  },
]);

export default AppRouter;
