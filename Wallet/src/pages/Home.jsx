import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Stack, Typography, Button } from '@mui/material';
import Login from "./Login";
import Create from "./Create";

const Home = () => {

  return (
    <div>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={4}
      >
        <Typography variant="h5">Neo Wallet</Typography>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="subtitle2">패스워드를 입력하여 로그인</Typography>
          <Button variant="contained" color="info" component={Link} to="/login" >Login</Button>
        </Stack>

        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="subtitle2">지갑 생성하기</Typography>
          <Button variant="contained" color="info">Create Wallet</Button>
        </Stack>
  
      </Stack>
    </div>
  );
};

export default Home;
