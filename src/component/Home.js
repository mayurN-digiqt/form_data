import React ,{ useState,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../App.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const Home = () => {
    const [user, setUser] = useState([]);
    
    useEffect(() =>{
        console.log("MR Nimavat");
        loadUsers();
    },[]);
    
    const loadUsers = async() =>{
        const result =  await axios.get("http://localhost:3002/formdata");
        setUser(result.data);
        console.log(result);
    }

    const deleteData = async (id) =>{
        await axios.delete(`http://localhost:3002/formdata/${id}`);
        loadUsers();
    }   
    return (
        <div className="container">
            <h1>Home Page</h1>
            <TableContainer component={Paper}>
            <div className="basetable">    
            <Table sx={{ maxWidth: 850 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="right">Firstame</TableCell>
                    <TableCell align="right">LastName</TableCell>
                    <TableCell align="right">Mobile</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Operation</TableCell>

                </TableRow>
                </TableHead>
                <TableBody>
                {user.map((user,index) => (
                    <TableRow
                    key={user.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {index + 1}
                    </TableCell>
                    <TableCell align="right">{user.firstName}</TableCell>
                    <TableCell align="right">{user.lastName}</TableCell>
                    <TableCell align="right">{user.mobile}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">
                    <Button   variant="contained"><Link to={`/editdata/${user.id}`} style={{textDecoration:"none", color:"white"}}>Edit Data</Link></Button><span> </span> 
                    <Button   variant="contained"><Link to="/" onClick={() => deleteData(user.id)} style={{textDecoration:"none", color:"white"}}>Delete</Link></Button>     
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </div>
            </TableContainer> 
        </div>
    );
}


export default Home;