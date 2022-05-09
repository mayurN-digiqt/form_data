import axios from "axios";
import React ,{useState,useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();


const EditData = () => {
    let history = useNavigate();
    const {id} = useParams();
    
    const formValues = { firstName: "", lastName:"", mobile:"", email:""}; 
    const [data, setdata] = useState(formValues);
    const [formerror, setformerror]= useState({});
    const [issubmit, setIsSubmit] = useState(false);


    const onChangeData = (e) => {
        const {name, value} = e.target;
          setdata({...data, [name] : value});
          // console.log(data);
          setformerror(validation(data));
        }
        const onSubmitData = async (e) => {
            e.preventDefault();
            setIsSubmit(true);
            if(Object.keys(formerror).length === 0 && issubmit){
              await axios.put(`http://localhost:3002/formdata/${id}`,data);  
              history("/");
            }
            } 
          
          useEffect(() =>{
            loadData();
          },[]);
          
          const validation = (value) => {
            const error = {};
            const regexnum = /^\b\d{3}[-.]?\d{3}[-.]?\d{4}\b$/
            ;
            const regexemail =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          
            const regexchar = /^[A-Za-z]+$/;
          
            if(!value.firstName){
              error.firstName = "FirstName Required....";
            }else if(!regexchar.test(value.firstName)){
              error.firstName = "Enter Character Only....";
            }
            if(!value.lastName){
              error.lastName = "LastName Required....";
            }else if(!regexchar.test(value.lastName)){
              error.lastName = "Enter Character Only....";
            }
            if(!value.mobile){
              error.mobile = "Mobile Number Required....";
            }else if(!regexnum.test(value.mobile)){
              error.mobile = "Enter Number Only....";
            }else if(value.mobile.length != 10){
              error.mobile = "you can not enter less than 10 digits....";
            }
            if(!value.email){
              error.email = "Email Address Required....";
            }else if(!regexemail.test(value.email)){
              error.email = "Enter Valid email Address....";
            }
            return error;
          }

       const loadData = async () =>{
         const result = await axios.get(`http://localhost:3002/formdata/${id}`);
         console.log(result);
         setdata(result.data);
       }   
    return (
      <>
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
  
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Edit Details
        </Typography>
        <Box component="form" noValidate  sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                maxLength={10} 
                value={data.firstName} onChange={onChangeData}
              />
              <Typography component="h4"  color="red" >
                     {formerror.firstName}
                    </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                maxLength={10}  
                value={data.lastName} onChange={onChangeData}
              />
              <Typography component="h4"  color="red" >
                     {formerror.lastName}
                    </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mobile"
                type="text"
                id="mobile"
                name="mobile"
                maxLength={10}  
                value={data.mobile} onChange={onChangeData}
              />
              <Typography component="h4"  color="red" >
                     {formerror.mobile}
                    </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email Address"
                name="email" value={data.email} onChange={onChangeData}
              />
              <Typography component="h4"  color="red" >
                     {formerror.email}
                    </Typography>
            </Grid>
           
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onSubmitData}
          >
            Update Data
          </Button>
        
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  </>
        
    )
}

export default EditData;
