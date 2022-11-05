import React, { useEffect, useState } from "react";
import { Link } from "react-chrome-extension-router";
import { Stack, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Login from "./Login";
import Create from "./Create";

const Home = () => {
  

  return (
    <div>
      
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Typography>Neo Wallet</Typography>
        <Typography>패스워드를 입력하여 로그인</Typography>
        {/* <Button variant="contained" color="info" component={Link} to="/Login" >Login</Button> */}
        <Link href="./Login" component={Login} underline="none">
          <Button variant="contained" color="info">Login</Button>
        </Link>

        <Typography>지갑 생성하기</Typography>
        {/* <Button variant="contained" color="info">Create Wallet</Button> */}
        <Link href="./Create" component={Create} underline="none">
          <Button variant="contained" color="info">Create Wallet</Button>
        </Link>
      </Stack>
    </div>
  );
};

export default Home;
