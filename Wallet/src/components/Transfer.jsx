/*global chrome*/
import React from "react";
import { Typography, Box, Stack, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { Link } from "react-router-dom";
import * as walletAPI from '../APIs/walletAPI';

const Transfer = () => {
	const [token, setToken] = React.useState("");
	
	const handleChange = async(event) => {
		setToken(event.target.value);
		console.log(token);
		const userAccount = {
			address: "NX3TCZ28zTppd53or2wQBjC5xXAXDyeLGP",
			privateKey: "d3f757bf350b9e79197e739971d97fbacdc181abd3a6bb66c0d2ac85bd5b3fcb",
			publicKey: "02144d47c73c2e74bf5cb427b3a526845143cb7e1727c1d397fdd3451728d9223b",
			scriptHash: "753d85c69d9f6653d40af66e6637928a17ae137a"
		}
		const toAddress = 'NTcWc839XGP39YrCrWkZseXNtBCGGxrzkQ';
		const tokenAmount = 5;
		const result = await walletAPI.transfer(userAccount, toAddress, tokenAmount);
		console.log(result);
	};

	return (
		<>
			<Box sx={{ p: 3 }}>
				<Stack spacing={2} direction="column" justifyContent="center">
					<Typography variant="h6">Token Transfer</Typography>
					<Stack direction="column" justifyContent="space-evenly" alignItems="left" spacing={1}>
						<Typography align="left" variant="h7">
							보내는 사람
						</Typography>
						{/* 내 어카운트의 address default로 넣기 */}
						<TextField id="FromAddress" defaultValue="my address" label="From Address" variant="outlined" size="small" />
					</Stack>
					<Stack direction="column" justifyContent="space-between" alignItems="left" spacing={1}>
						<Typography align="left" variant="h7">
							받는 사람
						</Typography>
						<TextField id="ToAddress" label="To Address" variant="outlined" size="small" />
					</Stack>
					<Stack direction="column" justifyContent="space-between" alignItems="left" spacing={1}>
						<Typography align="left" variant="h7">
							토큰 선택
						</Typography>
						<FormControl fullWidth size="small">
							<InputLabel id="demo-simple-select-helper-label">Token</InputLabel>
							<Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={token} label="Token" onChange={handleChange}>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>NEO</MenuItem>
								<MenuItem value={20}>Token1</MenuItem>
							</Select>
						</FormControl>
					</Stack>
					<Stack direction="column" justifyContent="space-between" alignItems="left" spacing={1}>
						<Typography align="left" t="h7">
							수수료
						</Typography>
						<TextField id="GasFee" label="0.0012 NEO" variant="outlined" size="small" disabled />
					</Stack>
          <Stack spacing={2} sx={{ pt:2 }}>
            <Button type="submit" variant="contained">Transfer</Button>
          </Stack>
				</Stack>
			</Box>
		</>
	);
};

export default Transfer;
