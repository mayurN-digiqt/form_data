import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import '../App.css';
const Navbar = () =>{
    return (
        <div>
            <Button className="link" variant="contained"> <Link to="/" style={{textDecoration:"none", color:"white"}}>Home Page</Link></Button>
            <Button className="link" variant="contained"><Link to="/about" style={{textDecoration:"none", color:"white"}}>About Page</Link></Button>
            <Button className="link" variant="contained"><Link to="/adddata" style={{textDecoration:"none", color:"white"}}>Add Data</Link></Button>
            <Button className="link" variant="contained"><Link to="/todolist" style={{textDecoration:"none", color:"white"}}>ToDo List</Link></Button>
            <Button className="link" variant="contained"><Link to="/apitest" style={{textDecoration:"none", color:"white"}}>API Testing</Link></Button>
            <Button className="link" variant="contained"><Link to="/calculator" style={{textDecoration:"none", color:"white"}}>Calculator</Link></Button>
        </div>
                    
        
    );
}
export default Navbar;