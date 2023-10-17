import { useContext } from "react";
import PasswordChangeForm from "./PasswordChangeForm";
import { ThemeContext } from "../../context/theme/context";

const PasswordChange = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`${theme} px-1 min-h-screen flex items-center justify-center bg-gray-100`}
    >
      <div
        className={`${
          theme === "dark" ? "dark:bg-gray-900" : null
        }  max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md`}
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Change Password
        </h1>
        <PasswordChangeForm />
      </div>
    </div>
  );
};

export default PasswordChange;
