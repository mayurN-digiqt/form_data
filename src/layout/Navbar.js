import React from "react";
import { Link } from "react-router-dom";

const Navbar = () =>{
    return (
        <div>
            <Link to="/">Home Page</Link><span> </span>
            <Link to="/about">About Page</Link><span> </span>
            <Link to="/adddata">Add Data</Link>
        </div>
                    
        
    );
}
export default Navbar;