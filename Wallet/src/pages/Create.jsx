/*global chrome*/
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Typography, Avatar, Button, CssBaseline, TextField, Grid, Box, Container, Alert, Stack } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as walletAPI from "../APIs/walletAPI";

const theme = createTheme();

const Create = () => {
	const navigate = useNavigate();
	const [myPassword, setMyPassword] = useState();
	const [myMnemonic, setMnemonic] = useState();
	const [myBal, setBal] = useState();
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		console.log(myPassword);
	}, [myPassword]);

	useEffect(() => {
		console.log(4, myBal);
		chrome.storage.local.set({ userBal: myBal });
	}, [myBal]);

	const [isCreate, setIsCreate] = useState(false);
	const [isPasswordSame, setIsPasswordSame] = useState(true);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const password = data.get("password");
		const confirmpassword = data.get("confirmpassword");
		if (password === confirmpassword && password !== undefined) {
			setIsPasswordSame(true);
			setMyPassword(password);
			console.log("set password");
			const [createRes, mnemonic] = await walletAPI.createWallet(password);
			console.log(createRes);
			setMnemonic(mnemonic);
			const balanceRes = await walletAPI.checkBalance(createRes.address);
			// Res 값 확인
			console.log(2, balanceRes.data.result.balance.length);
			const bal = balanceRes.data.result.balance.length
			console.log(3, bal)
			setBal(bal.toString())	

			// 웹에서 볼 때 주석 처리 !!
			chrome.storage.local.set({ encryptedAcc: createRes });
			chrome.storage.local.set({ scriptHash: createRes.scriptHash });
			chrome.storage.local.set({ address: createRes.address });
		} else {
			setIsPasswordSame(false);
			setMyPassword();
			console.log("error");
		}
	};

	const handleCreate = () => {
		setIsCreate(true);
	};

	const handleLogin = () => {
		navigate(`/login`);
	};

	const handleCopy = () => {
		setCopied(true);
		console.log("copy mnemonic");
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />

				<Box
					sx={{
						marginTop: 6,
						marginBottom: 3,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					{isCreate ? (
						<Box>
							{isPasswordSame ? (
								<Stack sx={{ width: "90%", p:2 }} spacing={2}>
									<Typography variant="button">
										Mnemonic is
									</Typography>
									<Typography variant="subtitle2" color="primary">
										<b>{myMnemonic}</b>
									</Typography>
									<Stack spacing={2} direction="row" justifyContent="flex-end">
										<CopyToClipboard text={myMnemonic} onCopy={handleCopy}>
											<Button variant="contained" color="success" align="left" onCopy={handleCopy} size="small" sx={{ width: "30px", m: "1" }}>
												복사
											</Button>
										</CopyToClipboard>
									</Stack>
								</Stack>
							) : (
								<Stack sx={{ width: "100%" }} spacing={2}>
									<Alert severity="error">비밀번호가 일치하지 않습니다.</Alert>
								</Stack>
							)}
						</Box>
					) : (
						<Stack sx={{ width: "90%", p:2 }} spacing={2}>
							<Typography variant="subtitle2" color="primary">여기에 니모닉 코드가 표시 됩니다.</Typography>
							<Typography variant="button">
							비밀번호를 입력하고, <br /> 니모닉 코드를 발급 받으세요.
							</Typography>
						</Stack>
					)}

					
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="confirmpassword"
									label="Confirm Password"
									type="password"
									id="confirmpassword"
									autoComplete="new-password-confirm"
								/>
							</Grid>
						</Grid>

						<Button type="submit" onClick={handleCreate} fullWidth variant="contained" sx={{ mt: 3, mb: 1 }}>
							생성하기
						</Button>
						<Button onClick={handleLogin} fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
							로그인 하기
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default Create;
