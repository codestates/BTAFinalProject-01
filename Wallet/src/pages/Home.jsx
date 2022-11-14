/*global chrome*/
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Stack, Typography, Button, Avatar, Box } from "@mui/material";
import * as msAPI from "../APIs/multisigAPI";

const Home = () => {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(false);
	
	const a = "1121p6T5oHoxwFitSLh6z1kCRxhbwDVokNJ6DbnTK8d5L1V8KrKKuzPXbCiC7nsuR2kiy3sjoCBsasNBvbVjFxrdfRirJkXQXC5c6Qyz1i4H37ZQvL6mfwtgWrH6rxKjmjCBL2SBpiP4zRW2XU6RNqgLa2pjTd36QPqEooiMi2RtCKahEpr9vz9qfCP69ZSB1fZF4vSRcGUis4MJaXxGsABTrvBBFWstcvcxPvQjxULYKnM3BL9Xp9oUaq5AaSTjJEmeEuWCLGLpyzu4CCC5cXvuwqRrpP5UE2UoLYuHwNnubRzGZVJF655yWfmEntbzeCUYrtGEhaKGr";
	const res = msAPI.signMultiSigTx(a, "84180ac9d6eb6fba207ea4ef9d2200102d1ebeb4b9c07e2c6a738a42742e27a5");
	console.log(11,res);

	useEffect(() => {
		// chrome.storage.local.get("login", (res) => {
		// 	if (res.login == true) {
		// 	navigate(`/content`);
		// 	setIsLogin(true);
		// 	}
		// });
		
	}, [isLogin]);

	return (
		<Box>
			{isLogin ? (
				navigate(`/content`)
			) : (
				<Box>
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
				</Box>
			)}
		</Box>
	);
};

export default Home;
