import React ,{ useState,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";


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
            
<table class="table" align="center" border="1">
  <thead class="thead-light">
    <tr>
      <th scope="col">#</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Mobile No.</th>
      <th scope="col">Email</th>
      <th>Operation</th>
    </tr>
  </thead>
  <tbody>
   {
       user.map((user, index) => (
       
       <tr>
            <th scope="row">{index + 1}</th>
            
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.mobile}</td>
            <td>{user.email}</td>
            <td>
                <Link to={`/editdata/${user.id}`} >Edit Data</Link><span> </span> 
                <Link to="/" onClick={() => deleteData(user.id)}>Delete</Link> 
            </td>
       </tr>
       
       ))
   }
  </tbody>
</table>
        </div>
    );
}


export default Home;