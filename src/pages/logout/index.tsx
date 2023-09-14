import {Navigate} from "react-router-dom"
const Logout = () => {
  localStorage.clear();
  
  return <Navigate to={"/home"}/>;
};
export default Logout;
