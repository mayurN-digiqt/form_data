import React, {useState} from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
const ApiIntergrate = () =>{
    const [data, setData] = useState([]);
    const displayData = async () =>{
        console.log("Done...");
        const response = await axios.get("https://jsonplaceholder.typicode.com/photos");
        console.log(response.data);
        await setData(response.data)
        console.log(data)       
    }

    return (
        <>
            <br/><Button variant="contained" onClick={displayData}>Click ME....</Button>
            <div >
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                {
                data.map((item) => (
                    <ImageListItem key={item.id}>
                    <img
                        src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
    </ImageListItem>
  ))}
</ImageList>
            </div>
        </>

    );

}


export default ApiIntergrate;