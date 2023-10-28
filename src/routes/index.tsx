import { Navigate, createBrowserRouter } from "react-router-dom";
import Signin from "../pages/signin";
import Signup from "../pages/signup/";
import ProtectedRoute from "./ProtectedRoute";
import PasswordChange from "../pages/password_change/";
import ArticleModal from "../pages/articles/ArticleModal";
import Logout from "../pages/logout";
import Preferences from "../pages/preferences";
import Dashboard from "../pages/dashboard";
import Articles from "../pages/articles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/home/articles"} replace />,
  },
  {
    path: "home",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Navigate to="/home/articles" replace />,
      },
      {
        path: "articles",
        element: <Articles />,
        children: [
          // { index: true, element: <Articles /> },
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
      {
        path: "change_password",
        element: (
          <ProtectedRoute>
            <PasswordChange />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/signin", element: <Signin /> },
  { path: "/signup", element: <Signup /> },
  { path: "/logout", element: <Logout /> },
]);

export default router;
