import PasswordChangeForm from "./PasswordChangeForm";

const PasswordChange = () => {
  return (
    <div className="px-1 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-1/4 px-6 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Change Password
        </h1>
        <PasswordChangeForm />
      </div>
    </div>
  );
};

export default PasswordChange;
