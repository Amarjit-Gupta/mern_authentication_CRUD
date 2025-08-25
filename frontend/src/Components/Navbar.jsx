import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { RxCross1 } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";
const Navbar = () => {

    const navigate = useNavigate();

    const [menu, setMenu] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/signup");
    }

    let auth = localStorage.getItem("user");
    // console.log();  {JSON.parse(auth).name}


    let st = { textDecoration: "none" };

    return (
        <div className="navbar">
            <div className="image">
                <img src="./images/OIP.jpg" alt="Broken Image" />
            </div>


            {auth ?
                <>
                    <button className="btn2" onClick={() => setMenu(!menu)}>{menu ? <span className="btn4"><RxCross1 /></span> : <span className="btn4"><RxHamburgerMenu /></span>}</button>

                    <ul className={`un1 ${menu ? "x1" : ""}`}>
                        <li><NavLink to={"/"} style={st} onClick={() => setMenu(!menu)}>ProductList</NavLink></li>
                        <li><NavLink to={"/add"} style={st} onClick={() => setMenu(!menu)}>AddProduct</NavLink></li>
                        <li><button onClick={handleLogout} className="logout-btn">Logout</button>
                            <span className="name">({JSON.parse(auth).name.length > 15 ? JSON.parse(auth).name.slice(0, 12) + "..." : JSON.parse(auth).name})
                            </span></li>
                    </ul>
                </>
                :
                <ul className="un2">
                    <li><NavLink to={"/login"} style={st}>Login</NavLink></li>
                    <li><NavLink to={"/signup"} style={st}>Signup</NavLink></li>
                </ul>
            }

        </div>
    );
};
export default Navbar;

