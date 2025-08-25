import { BrowserRouter, Route, Routes } from "react-router";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import ProductList from "./Components/ProductList";
import AddProduct from "./Components/AddProduct";
import UpdateProduct from "./Components/UpdateProduct";
import PrivateComponent from "./Components/PrivateComponent";
import Error from "./Components/Error";
import { useEffect, useState } from "react";

const App = () => {

    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);

    return (
        <>

            {loader ? <div className="loader">
                <img src="./images/loader.gif" alt="" />
            </div> : ""}

            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route element={<PrivateComponent />}>
                        <Route path="/" element={<ProductList />} />
                        <Route path="/add" element={<AddProduct />} />
                        <Route path="/update/:id" element={<UpdateProduct />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};
export default App;