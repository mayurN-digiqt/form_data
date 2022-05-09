import axios from "axios";
import React ,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();


const AddData = () => {
    let history = useNavigate();
    
    const [data, setdata] = useState({ firstName: "", lastName:"", mobile:"", email:""});
    const [formerror, setformerror]= useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const onChangeData = (e) => {
        const {name, value} = e.target;
     
      // console.log("Work .....",e.target.value);
          setdata({...data, [name] : value});
          setformerror(validation(data));
          
        }
        const onSubmitData = async () => {
            console.log("Console is called");
          
            console.log(isSubmit)
            if(Object.keys(formerror).length === 0 && isSubmit){
              await axios.post("http://localhost:3002/formdata",data);  
              history("/");
            }
          } 

     
     
          useEffect(() =>{
      
            setTimeout(()=>{
              setIsSubmit(true);
           },3000);
          },[]);
          
          const validation = (value) => {
            const error = {};
            const regexnum = /^\b\d{3}[-.]?\d{3}[-.]?\d{4}\b$/;
            const regexemail =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
          
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
              console.log("Required");
              error.mobile = "Mobile Number Required....";
            }else if(!regexnum.test(value.mobile)){
              console.log("only number");
              error.mobile = "Enter Number Only....";
            }else if(value.mobile.length != 10){
              console.log("enter 10  digit only");
              error.mobile = "you can not enter less than 10 digits....";
            }
            if(!value.email){
              error.email = "Email Address Required....";
            }else if(!regexemail.test(value.email)){
              error.email = "Enter Valid email Address....";
            }
            if(Object.keys(formerror).length === 0){
              setDisabled(false);
            }
            return error;
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
                Sign up
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
                      inputProps={{
                        maxLength: 10
                      }}
                       
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
                      inputProps={{
                        maxLength: 10
                      }}
                      value={data.lastName} onChange={onChangeData}
                    />
                    <Typography component="h4" color="red" >
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
                      inputProps={{
                        maxLength: 10
                      }} 
                      value={data.mobile} onChange={onChangeData}
                    />
                     <Typography component="h4" color="red" >
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
                     <Typography component="h4" color="red" >
                     {formerror.email}
                    </Typography>
                  </Grid>
                

                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={onSubmitData}
                  disabled={disabled}
                >
                  Sign Up
                </Button>
              
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </>
        
    )
}

export default AddData;