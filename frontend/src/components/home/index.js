import React from "react";
import { Container } from "@mui/system";
import{ Box }from "@mui/material";
import { Paper } from "@mui/material";
import {Typography} from "@mui/material";


export const Home = () => {
   return( 
   <Container
        maxWidth="md"
  
   >
      <Box
      sx={{
        display: 'flex',
        flexDirection:'Column',
        alignItems:'center',
        '& > :not(style)': {
          m: 1,
          width: 800,
          height: 500,
        },
      }}
    >
      <Paper 
      elevation={0} 
      sx={{
        background: "-webkit-linear-gradient(to right, #434343, #000000) ",/* Chrome 10-25, Safari 5.1-6 */
        background: "linear-gradient(to right, #434343, #000000);" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      }}

      >
        <Typography
        variant="h2"
              sx={{
            width:"fit-content",
            margin:"auto",
            color:"white"
              }}>
            Welcome
        </Typography>

      </Paper>
      <Paper 
      sx={{
        background: "-webkit-linear-gradient(to right, #434343, #000000) ",/* Chrome 10-25, Safari 5.1-6 */
        background: "linear-gradient(to right, #434343, #000000);" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      }}
      />
      <Paper 
      elevation={3} 
      sx={{
        background: "-webkit-linear-gradient(to right, #434343, #000000) ",/* Chrome 10-25, Safari 5.1-6 */
        background: "linear-gradient(to right, #434343, #000000);" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      }}
      />
    </Box>

    </Container>
   )
}