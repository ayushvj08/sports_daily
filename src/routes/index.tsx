import { Navigate, createBrowserRouter } from "react-router-dom";
import Signin from "../pages/signin";
import Signup from "../pages/signup/";
import ProtectedRoute from "./ProtectedRoute";
import PasswordChange from "../pages/password_change/";
import Articles from "../pages/articles";
import ArticleModal from "../pages/articles/ArticleModal";
import AppBar from "../layout/AppBar";
import Logout from "../pages/logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/home"} />,
  },
  {
    path: "/home",
    element: <AppBar />,
    children: [
      {
        index: true,
        element: <Navigate to="/home/articles" replace />,
      },

      {
        path: "articles",
        element: <Articles />,
        children: [
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
        <>
          <AppBar />

          <PasswordChange />
        </>
      </ProtectedRoute>
    ),
  },
]);

export default router;
