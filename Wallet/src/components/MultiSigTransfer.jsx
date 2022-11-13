/*global chrome*/
import React, { useState, useEffect } from 'react';
import { Typography, Box, Stack, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { Link } from "react-router-dom";
import * as mx from "../APIs/multisigAPI";
import { CONST } from "@cityofzion/neon-core";

const MultiSigTransfer = () => {
	const [multiAcc, setMultiAcc] = useState();
	const [fromMulti, setFromMulti] = useState("");
	// 웹에서 볼 때 주석 처리 !!
  chrome.storage.local.get(["multiSig", "publicKey", "scriptHash"], (res) => {
    setMultiAcc({
			multiSig: res.multiSig,
			publicKey: res.publicKey,
			scriptHash: res.scriptHash
		});
		// console.log(multiAcc);
  });
	chrome.storage.local.get("multiSig", (res) => {
		setFromMulti(res.multiSig);
  });

	const [ToAddress, setToAddress] = useState(""); // 받는 사람 주소
  const [amount, setAmount] = useState(""); // 전송할 토큰 양
	const [token, setToken] = useState(); // 전송할 토큰 선택
	const handleTo = (e) => { setToAddress(e.target.value); };
  const handleAmount = (e) => { setAmount(e.target.value); };
	const handleChange = (event) => {
		setToken(event.target.value);
		console.log(token);
	};

	const handleClick = async(event) => {
		const multiSigAccount = multiAcc;
		// const fromAddress = fromMulti;
		const toAddress = ToAddress;
		const tokenAmount = amount;
		const tokenHash = token;
		const result = await mx.mkMultiSigTx(tokenHash, tokenAmount, multiSigAccount, toAddress);
		console.log(result);
		console.log('success transfer')
		alert('success transfer: ' + result);
	};

	return (
		<>
			<Box sx={{ p: 3 }}>
				<Stack spacing={2} direction="column" justifyContent="center">
					<Typography variant="h6">MultiSig Transfer</Typography>
					<Stack direction="column" justifyContent="space-evenly" alignItems="left" spacing={1}>
						<Typography align="left" variant="h7">
							보내는 사람
						</Typography>
						{/* 내 어카운트의 multisig address default로 넣기 */}
						<TextField id="FromAddress" defaultValue={fromMulti} placeholder={fromMulti} variant="outlined" size="small" />
					</Stack>
					<Stack direction="column" justifyContent="space-between" alignItems="left" spacing={1}>
						<Typography align="left" variant="h7">
							받는 사람
						</Typography>
						<TextField id="ToAddress" label="To Address" variant="outlined" size="small" onChange={(e) => handleTo(e)} />
					</Stack>
					<Stack direction="column" justifyContent="space-between" alignItems="left" spacing={1}>
						<Typography align="left" variant="h7">
							토큰 선택
						</Typography>
						<FormControl fullWidth size="small">
							<InputLabel id="demo-simple-select-helper-label">Token</InputLabel>
							<Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={token} label="Token" onChange={handleChange}>
								<MenuItem value={CONST.NATIVE_CONTRACT_HASH.NeoToken}>NEO</MenuItem>
								<MenuItem value={CONST.NATIVE_CONTRACT_HASH.GasToken}>GAS</MenuItem>
							</Select>
						</FormControl>
					</Stack>
					<Stack direction="column" justifyContent="space-between" alignItems="left" spacing={1}>
						<Typography align="left" t="h7">
							토큰 양
						</Typography>
						<TextField id="Amount" label="Token Amount" variant="outlined" size="small" onChange={(e) => handleAmount(e)} />
					</Stack>
					<Stack direction="column" justifyContent="space-between" alignItems="left" spacing={1}>
						<Typography align="left" t="h7">
							수수료
						</Typography>
						<TextField id="GasFee" label="0.0012 NEO" variant="outlined" size="small" disabled />
					</Stack>
          <Stack spacing={2} sx={{ pt:2 }}>
            <Button type="submit" onClick={handleClick} variant="contained">Transfer</Button>
          </Stack>
				</Stack>
			</Box>
		</>
	);
};

export default MultiSigTransfer;
