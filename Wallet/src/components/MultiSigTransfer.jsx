/*global chrome*/
import React, { useState, useEffect } from 'react';
import { Typography, Box, Stack, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { Link } from "react-router-dom";
import * as msAPI from "../APIs/multisigAPI";
import { CONST } from "@cityofzion/neon-core";

const MultiSigTransfer = () => {
	const [userAcc, setUserAcc] = useState("");
	const [multiAcc, setMultiAcc] = useState("");
	const [webHook, setWebHook] = useState("");
	// 웹에서 볼 때 주석 처리 !!
	chrome.storage.local.get("multiSig", (res) => {
		setMultiAcc(res.multiSig);
	});

	chrome.storage.local.get(["address", "privateKey"], (res) => {
		setUserAcc({
			address: res.address,
			privateKey: res.privateKey,
		});
	});

	chrome.storage.local.get("webHook", (res) => {
		setWebHook(res.webHook);
	});

	const [ToAddress, setToAddress] = useState(""); // 받는 사람 주소
  	const [amount, setAmount] = useState(""); // 전송할 토큰 양
	const [token, setToken] = useState(""); // 전송할 토큰 선택
	const handleTo = (e) => { setToAddress(e.target.value); };
  	const handleAmount = (e) => { setAmount(e.target.value); };
	const handleChange = (event) => {
		setToken(event.target.value);
		console.log(token);
	};

	const handleClick = async(event) => {
		const toAddress = ToAddress;
		const tokenAmount = amount;
		const tokenHash = token;
		const encodedTx = await msAPI.mkMultiSigTx(tokenHash, tokenAmount, multiAcc, toAddress, userAcc.privateKey);
		console.log(encodedTx);
		const msg = `${userAcc.address} 계정의 주인이 새로운 Tx를 생성했습니다. \n
		내용 : ${toAddress}에게 ${tokenAmount} 토큰을 전송 (토큰 해시:${tokenHash}) \n
		서명 하시려면 지갑에서 "Get MultiSig TX" 버튼을 누르고 아래의 값을 입력하세요. \n
		encoded Tx:${encodedTx}\n
		webHook URL:${webHook}
		`;
		await msAPI.sendMSG(webHook,msg).then((res)=>{
			console.log(res);
			alert('check discord message!');
		})
		
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
						<TextField id="FromAddress" defaultValue={multiAcc.address} placeholder={multiAcc.address} variant="outlined" size="small" />
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
