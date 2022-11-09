import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Typography, Avatar, Button, CssBaseline, TextField, Grid, Box, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as walletAPI from '../APIs/walletAPI';
// import { hashed } from "../utils/api.js";

const theme = createTheme();

function Create(){
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			password: data.get("password"),
			confirmpassword: data.get("confirmpassword"),
		});
		const res = walletAPI.createWallet(data);
		console.log(res);
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
					<Typography component="h6" variant="h6">
						비밀번호를 입력하고, <br /> 니모닉 코드를 발급 받으세요.
					</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField 
									required 
									fullWidth 
									name="password" 
									label="Password" 
									type="password" 
									id="password" 
									autoComplete="new-password" />
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="confirmpassword "
									label="Confirm Password"
									type="password"
									id="confirmpassword"
									autoComplete="new-password-confirm"
								/>
							</Grid>
						</Grid>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							Sign Up
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default Create;
