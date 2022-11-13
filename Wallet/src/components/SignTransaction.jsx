/*global chrome*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Stack, Button, Box, TextField, Paper } from "@mui/material";
import * as msAPI from "../APIs/multisigAPI";
import { Link } from "react-router-dom";

const InitAccount = () => {
	const navigate = useNavigate();
	const [userAcc, setUserAcc] = useState("");
	const [encodedTx, setEncodedTx] = useState("");
	const [webHook, setWebHook] = useState("");

	chrome.storage.local.get(["address", "privateKey"], (res) => {
		setUserAcc({
			address: res.address,
			privateKey: res.privateKey,
		});
	});

	const handleInput1 = (event) => {
		setEncodedTx(event.target.value);
	};

	const handleInput2 = (event) => {
		setWebHook(event.target.value);
	};

	const handleClick = async() => {
		const encodedTx2 = msAPI.signMultiSigTx(encodedTx, userAcc.privateKey);
		const msg = `${userAcc.address} 계정의 주인이 서명에 참가했습니다. \n
		서명 하시려면 지갑에서 "Get MultiSig TX" 버튼을 누르고 아래의 값을 입력하세요. \n
		encoded Tx:${encodedTx}\n
		webHook URL:${webHook}
		`;
		await msAPI.sendMSG(webHook,msg).then((res)=>{
			console.log(res);
			alert('해당 요청에 사인했습니다!');
		})
		await msAPI.sendMultiSigTx(encodedTx2).then((res)=>{
			console.log(res);
			alert('해당 tx이 전송되었습니다!');
		})
	};

	const goHome = () => {
		navigate("/");
	};

	return (
		<Box sx={{ p: 3 }}>
			<Stack spacing={3} direction="column" justifyContent="center">
				<Typography variant="h6">Multisig Transaction Sign</Typography>
				<Stack spacing={6} direction="column" justifyContent="center"sx={{ p: 2, m: 2 }}>
					<TextField 							
						label={"encoded Tx"}
						style={{ height: "10px", width: "90%" }}
						onChange={handleInput1} />
					<TextField 							
						label={"webHook URL"}
						style={{ height: "10px", width: "90%" }}
						onChange={handleInput2} />
					<div style={{marginTop:"20%"}}>
						<Typography variant="h7" color="primary">
							해당 요청에 사인 하시겠습니까?
						</Typography>
					</div>
					
				</Stack>
				<Button variant="contained" onClick={handleClick} sx={{ m: "1" }}>
					사인하기
				</Button>
				<Button variant="contained" onClick={goHome} sx={{ m: "1" }}>
					홈으로 가기
				</Button>
			</Stack>
		</Box>
	);
};

export default InitAccount;
