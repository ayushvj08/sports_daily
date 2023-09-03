import { useForm, SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from "../../config/constant";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};
const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData.errors) console.log(responseData.errors);
      if (!response.ok) throw new Error("Fetch users failed!");

      localStorage.setItem("userData", JSON.stringify(responseData.user));
      localStorage.setItem("authToken", responseData.auth_token);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Email:
          </label>
          <input
            placeholder="Enter Email"
            type="text"
            className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.email ? "border-red-500" : ""
            }`}
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500">This field is required!</span>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Password:
          </label>
          <input
            placeholder="Enter Password"
            type="password"
            className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.password ? "border-red-500" : ""
            }`}
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500">This field is required!</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Sign in
        </button>
      </form>
    </>
  );
};

export default SigninForm;
