import { useState } from "react";
import { useNavigate } from "react-router";
import Footer from "./Footer";
import { URL } from "../URL";
import { ToastContainer, toast } from 'react-toastify';
import { BiLoader } from "react-icons/bi";

const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        // console.log(name, price, category, company);
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        else if (name.trim() && price.trim() && category.trim() && company.trim()) {
            setLoading(true);
            try {
                let result = await fetch(`${URL}/addproduct`, {
                    method: "post",
                    body: JSON.stringify({ name, price, category, company }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                let data = await result.json();
                if (data) {
                    navigate("/");
                    // console.log(data);
                    setLoading(false);
                }
                else {
                    // console.log("no data");
                }
            }
            catch (err) {
                console.log("error: ", err);
                // alert("data not insert.");
            }
        }
        else {
            toast.warn("white space not allowed...");
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="main-signup">
                <div className="signup">
                    <h1>Add Product</h1>
                    <form onSubmit={handleSignup}>
                        <input type="text" className="input-Box" placeholder="Enter product Name" value={name} onChange={(event) => setName(event.target.value)} />
                        {error && !name ? <p className="text">Enter Product Name</p> : ""}
                        <input type="number" className="input-Box" placeholder="Enter product price" value={price} onChange={(event) => setPrice(event.target.value)} />
                        {error && !price ? <p className="text">Enter Product Price</p> : ""}
                        <input type="text" className="input-Box" placeholder="Enter product category" value={category} onChange={(event) => setCategory(event.target.value)} />
                        {error && !category ? <p className="text">Enter Product Category</p> : ""}
                        <input type="text" className="input-Box" placeholder="Enter product company" value={company} onChange={(event) => setCompany(event.target.value)} />
                        {error && !company ? <p className="text">Enter Product Company</p> : ""}
                        <div className="new-btn">
                        <button type="submit" className="btn" disabled={loading}>
                        {loading?
                        <span className="loader-icon">Adding...<BiLoader className="icon" /></span>
                        :"Add"}
                        </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default AddProduct;