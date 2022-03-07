import axios from "axios";
import React ,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";


const AddData = () => {
    let history = useNavigate();
   
    const formValues = { firstName: "", lastName:"", mobile:"", email:""}; 
    const [data, setdata] = useState(formValues);
    const [formerror, setformerror]= useState({});
    const [issubmit, setIsSubmit] = useState(false);


    const onChangeData = (e) => {
        const {name, value} = e.target;
          setdata({...data, [name] : value});
          // console.log(data);
        }
        const onSubmitData = async (e) => {
            console.log("Console is called");
            e.preventDefault();
            await setIsSubmit(true);
            console.log(issubmit)
            if(Object.keys(formerror).length === 0 && issubmit){
              await axios.post("http://localhost:3002/formdata",data);  
              history("/");
            }else{
              setformerror(validation(data));
            }  
          } 

          // const onStateChange = async (e) => {
          //   e.preventDefault();
          //   await setIsSubmit(true);
          //     onSubmitData();  
          // }
          
          // useEffect(() =>{
          //   if(Object.keys(formerror).length === 0 && issubmit){
          //     console.log("Done....");
          //   }
          // },[]);
          
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

    return (
        <>
        <h1>Add Details</h1>
        <form onSubmit={onSubmitData}>
        <label>Enter First Name:</label>
        <input type="text" maxLength={10} name="firstName" value={data.firstName} onChange={onChangeData}/><br/><br/>
        <p>{formerror.firstName}</p>
        <label>Enter Last Name:</label>
        <input type="text" maxLength={10} name="lastName" value={data.lastName} onChange={onChangeData}/><br/><br/>
        <p>{formerror.lastName}</p>
        <label>Enter Mobile No.</label>
        <input type="text"  maxLength={10} name="mobile" value={data.mobile} onChange={onChangeData}/><br/><br/>
        <p>{formerror.mobile}</p>
        <label>Enter Email Id.</label>
        <input type="text" name="email" value={data.email} onChange={onChangeData}/><br/><br/>
        <p>{formerror.email}</p>
        <button type="submit" >Submit Data</button>
      </form>
        </>
        
    )
}

export default AddData;