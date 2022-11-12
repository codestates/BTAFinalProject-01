import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Stack, Typography, Button, Avatar } from "@mui/material";

const Home = () => {
	return (
		<Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={4} sx={{ mt: 4 }}>
			<Typography variant="h5">Neo Wallet</Typography>
      <Avatar variant="square" alt="Neo" src={require("../assets/neoline.png")} sx={{ width: 40, height: 40 }} />
			<Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
				<Typography variant="subtitle2">패스워드를 입력하여 로그인</Typography>
				<Button variant="contained" color="info" component={Link} to="/login">
					Login
				</Button>
			</Stack>

			<Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
				<Typography variant="subtitle2">지갑 생성하기</Typography>
				<Button variant="contained" color="info" component={Link} to="/create">
					Create Wallet
				</Button>
			</Stack>

			<Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
				<Link component={Link} to="/findmnemonic" variant="body2">
					패스워드를 잊으셨나요?
				</Link>
        		<Link component={Link} to="/initaccount" variant="body2">
					복구 구문을 잊으셨나요?
				</Link>
			</Stack>
		</Stack>
	);
};

export default Home;
