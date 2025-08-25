import { Navigate, Outlet } from "react-router";

const PrivateComponent = () => {
    let auth = localStorage.getItem("user");
    return(auth?<Outlet/>:<Navigate to={"/signup"}/>);
};
export default PrivateComponent;