import { Button } from "@mui/material";

export const CustomConnectedView = ()=> {
    return (
        <div>
           <Button sx={{margin: "1rem 1rem", width:"245px", height:"50px"}} variant="outlined" disabled>已连接</Button>
        </div>
    );
}