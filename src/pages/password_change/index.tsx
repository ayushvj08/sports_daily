import { useContext } from "react";
import PasswordChangeForm from "./PasswordChangeForm";
import {
  ThemeContext,
  ThemeContextProvider,
} from "../../context/theme/context";
import AppBar from "../../layout/AppBar";
import { ArticleContextProvider } from "../../context/articles/context";
import { PreferencesContextProvider } from "../../context/preferences/context";

const PasswordChange = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <ThemeContextProvider>
      <ArticleContextProvider>
        <PreferencesContextProvider>
          <AppBar />
          <div
            className={`${theme} dark:bg-gray-800 px-1 min-h-screen flex items-center justify-center bg-gray-100`}
          >
            <div
              className={`${theme} dark:bg-gray-900 max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md`}
            >
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Change Password
              </h1>
              <PasswordChangeForm />
            </div>
          </div>
        </PreferencesContextProvider>
      </ArticleContextProvider>
    </ThemeContextProvider>
  );
};

export default PasswordChange;
