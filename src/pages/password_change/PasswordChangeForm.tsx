import { useForm, SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from "../../config/constant";
import { useNavigate } from "react-router-dom";

type Inputs = {
  current_password: string;
  new_password: string;
};
const PasswordChangeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const token = localStorage.getItem("authToken");
      console.log(token);
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData.errors) console.log(responseData.errors);
      if (!response.ok) throw new Error("Fetch users failed!");

      console.log(responseData.status);
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
          <label className="block text-teal-700 font-semibold mb-2">
            Current Password:
          </label>
          <input
            type="text"
            className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.current_password ? "border-red-500" : ""
            }`}
            {...register("current_password", { required: true })}
          />
          {errors.current_password && (
            <span className="text-red-500">This field is required!</span>
          )}
        </div>

        <div>
          <label className="block text-teal-700 font-semibold mb-2">
            New Password:
          </label>
          <input
            type="password"
            className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.new_password ? "border-red-500" : ""
            }`}
            {...register("new_password", { required: true })}
          />
          {errors.new_password && (
            <span className="text-red-500">This field is required!</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Change Password
        </button>
      </form>
    </>
  );
};

export default PasswordChangeForm;
