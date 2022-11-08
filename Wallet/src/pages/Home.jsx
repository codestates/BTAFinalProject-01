import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Stack, Typography, Button } from '@mui/material';

const Home = () => {

  return (
    <div>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={5}
        sx={{ mt:4 }}
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
          <Button variant="contained" color="info" component={Link} to="/create">Create Wallet</Button>
        </Stack>

        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
        >
          <Link href="#" variant="body2">
            비밀키 복구 구문을 잃어버리셨나요?
          </Link>     
        </Stack>
  
      </Stack>
    </div>
  );
};

export default Home;
