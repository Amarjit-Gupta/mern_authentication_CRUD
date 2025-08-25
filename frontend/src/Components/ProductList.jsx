import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import { URL } from "../URL";
const ProductList = () => {

    const [value, setValue] = useState([]);

    const [loading, setLoading] = useState(false);


    const getData = async () => {
        setLoading(true);
        try {
            let result = await fetch(`${URL}/productlist`);
            let data = await result.json();
            // console.log("list:  ",data);
            setValue(data);
            setLoading(false);
        }
        catch (err) {
            console.log("error: ", err);
        }

    }


    //  console.log(value);

    const handleDelete = async (index) => {
        var a = confirm("Are you sure...");
        if (a) {
            try {
                let result = await fetch(`${URL}/delete/${index}`, {
                    method: "delete"
                });
                let data = await result.json();
                if (data) {
                    toast.success("data deleted......");
                    getData();
                }
            }
            catch (err) {
                console.log("error: ", err);
                // alert("data not delete.");
            }
        }
        else {
            toast.error("data not delete......");
        }
    }

    useEffect(() => {

        getData();
    }, []);


    const handleChange = async (event) => {
        // console.log(event.target.value);
        let key = event.target.value;
        if (key) {
            let item = await fetch(`${URL}/search/${key}`);
            let item1 = await item.json();
            // console.log(item1);
            setValue(item1);
        }
        else {
            getData();
        }
    }

    return (
        <div className="product-list">
            <ToastContainer />
            <h1>Product List</h1>
            <input type="search" className="search-Box" placeholder="search here......" onChange={handleChange} />

            <ul className="product-list-container">
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>

            {loading ? <img className="loading1" src="./images/loader.gif" alt="" /> :
                value.length > 0 ?
                    value.map((v, i) => {
                        return (
                            <ul key={i} className="product-list-container">
                                <li>{i + 1}.</li>
                                <li>{v.name.length > 8 ? v.name.slice(0, 7) + ".." : v.name}</li>
                                <li>₹{v.price.length > 8 ? v.price.slice(0, 7) + ".." : v.price}</li>
                                <li>{v.category.length > 8 ? v.category.slice(0, 7) + ".." : v.category}</li>
                                <li>{v.company.length > 8 ? v.company.slice(0, 7) + ".." : v.company}</li>
                                <li>
                                    <button className="btn1" onClick={() => handleDelete(v._id)}>Delete</button>
                                    <button className="btn1 btn-m"><Link to={`/update/${v._id}`} style={{ textDecoration: "none", color: "black" }}>Edit</Link></button>
                                </li>
                            </ul>
                        )
                    }) :
                    <ul className="not-found">
                        <li>Data not found</li>
                    </ul>
            }
        </div>
    );
};
export default ProductList;