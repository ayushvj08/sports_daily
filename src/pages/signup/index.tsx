import SignupForm from "./SignupForm";

const Signin = () => {
  return (
    <div className="px-1 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-8">
          Sign up
        </h1>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signin;
