import axios from "axios";
import '../App.css';
import React ,{useState,useEffect} from "react";
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





const ToDoList = () =>{
    const taskValues = { taskName: ""}; 
    const [task, setTask] = useState(taskValues);
    const [list, setList] = useState([]);

    const button = {
            padding: "14px",
            fontSize: "16px"
    };
    const onChangeData = (e) => {
        const {name, value} = e.target;
          setTask({...task, [name] : value});
        }
    const onSubmitTask = async(e) => {
        console.log("Console is called");
 
        await axios.post("http://localhost:3002/todotask",task);
        setTask({taskName: ""});
        loadTask();

    }
     
    useEffect(() =>{
        loadTask();

    },[]);     

    const loadTask = async() =>{
        console.log("Done.....");
         const result =  await axios.get("http://localhost:3002/todotask");
         let newlist = result.data.map((elem)=>{   
            elem.disabled = true;
            elem.showbtn = false;
            elem.showeditbtn = true;
            return elem;    
         });
         console.log("Data...",newlist);
       await setList(newlist);
        console.log("List", list);
    }
    const deleteData = async (id) =>{
        await axios.delete(`http://localhost:3002/todotask/${id}`);
         loadTask();
    }
    const onSubmitData = async (id) => {
        console.log("Done....", id);
          await axios.put(`http://localhost:3002/todotask/${id}`,task);  
          loadTask();
        } 
    const editTask = (id) => { 
        let newTask = list.map((elem)=>{  
            if(id === elem.id) {
                elem.disabled = false;
                elem.showbtn = true;
                elem.showeditbtn = false;
            }
            return elem;
        })
        setList(newTask);
    }
    const handleUpdateChange= (e) =>{
        const {name, value} = e.target;
        setTask({...task, [name] : value});
    }
    return (
    <div className="container"><br/>
        <Typography component="h1" variant="h5">
            TO Do List
          </Typography><br/>
        <TextField type="text" name="taskName" value={task.taskName} onChange={onChangeData}/><span> </span>
        <Button 
            // fullWidth    
            variant="contained"
            color="success"
            style={button}
            onClick={onSubmitTask}
        >
            Submit Data
        </Button>
   
        <TableContainer component={Paper}>
        <div  className="basetable">
            <Table sx={{ maxWidth: 550 }} aria-label="simple table">
                <TableBody>
                {list.map((list) => (
                    <TableRow
                    key={list.id}
                    >
                    <TableCell component="th" scope="row">
                    <TextField type="text" defaultValue={list?.taskName} name="taskName" onChange={handleUpdateChange} disabled={list.disabled} />
                    </TableCell>
                    <TableCell align="right">
                    { list.showbtn ? <> <Button  variant="contained"  onClick={() => onSubmitData(list.id)}>Update Task</Button></> : null }
                                    { list.showeditbtn ? <> <Button  variant="contained"  onClick={(id) => editTask(list.id) }>Edit Data</Button><span> </span> </> : null } 
                                    
                                    <Button 
                                        variant="contained"
                                        onClick={() => deleteData(list.id)}
                                        >
                                        Delete
                                    </Button>
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

export default ToDoList;