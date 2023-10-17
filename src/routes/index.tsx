import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import Signin from "../pages/signin";
import Signup from "../pages/signup/";
import ProtectedRoute from "./ProtectedRoute";
import PasswordChange from "../pages/password_change/";
import ArticleModal from "../pages/articles/ArticleModal";
import AppBar from "../layout/AppBar";
import Logout from "../pages/logout";
import Preferences from "../pages/preferences";
import Dashboard from "../pages/dashboard";
import { ThemeContextProvider } from "../context/theme/context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/home"} />,
  },
  {
    path: "/home",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Navigate to="/home/articles" replace />,
      },
      {
        path: "articles",
        element: <Outlet />,
        children: [
          {
            path: "preferences",
            element: (
              <ProtectedRoute>
                <Preferences />
              </ProtectedRoute>
            ),
          },
          {
            path: ":articleId",
            children: [{ index: true, element: <ArticleModal /> }],
          },
        ],
      },
    ],
  },
  { path: "/signin", element: <Signin /> },
  { path: "/signup", element: <Signup /> },
  { path: "/logout", element: <Logout /> },
  {
    path: "/password_reset",
    element: (
      <ProtectedRoute>
        <ThemeContextProvider>
          <AppBar />
          <PasswordChange />
        </ThemeContextProvider>
      </ProtectedRoute>
    ),
  },
]);

export default router;
