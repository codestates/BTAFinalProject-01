/*global chrome*/
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Typography, Avatar, Button, CssBaseline, TextField, Grid, Box, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { wallet } from "@cityofzion/neon-js";
import * as walletAPI from "../APIs/walletAPI";

const theme = createTheme();

const Login = () => {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		chrome.storage.local.set({ login: true });
	}, [isLogin]);

	const handleLogin = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const pw = data.get("password");

		// 웹에서 볼 때 주석 처리 !!
		chrome.storage.local.get("encryptedAcc", async(res) => {
			const decryptedAccount = await walletAPI.Login(res.encryptedAcc, pw);
      chrome.storage.local.set({ decryptedAcc: decryptedAccount });
			setIsLogin(true);
			alert("로그인 성공");
			navigate("/content");
		});
	};

	const backHome = () => {
		setIsLogin(false);
		chrome.storage.local.set({ login: false });
		navigate("/");
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 6,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<Avatar sx={{ m: 3, bgcolor: "success.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h5" variant="h6">
						비밀번호를 입력하여 <br /> 계정에 로그인하세요.
					</Typography>
					<Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
							</Grid>
						</Grid>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							로그인
						</Button>
						<Button onClick={backHome} fullWidth variant="contained" sx={{ mb: 2 }}>
							홈으로
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default Login;
