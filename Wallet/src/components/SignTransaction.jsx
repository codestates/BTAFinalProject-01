/*global chrome*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Stack, Button, Box, TextField, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const InitAccount = () => {
	const navigate = useNavigate();

	const [encodedTx, setEncodedTx] = useState("");
	const [idList, setIdList] = useState("");

	const handleInput1 = (event) => {
		setEncodedTx(event.target.value);
	};

	const handleInput2 = (event) => {
		setIdList(event.target.value);
	};

	const handleSign = () => {
		alert("해당 요청에 사인했습니다.");
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
						label={"slack ids (seperate by comma)"}
						style={{ height: "10px", width: "90%" }}
						onChange={handleInput2} />
					<div style={{marginTop:"20%"}}>
						<Typography variant="h7" color="primary">
							해당 요청에 사인 하시겠습니까?
						</Typography>
					</div>
					
				</Stack>

				<Button variant="contained" onClick={handleSign} sx={{ m: "1" }}>
					사인하기
				</Button>
			</Stack>
		</Box>
	);
};

export default InitAccount;
