/*global chrome*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Stack, Button, Box, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const InitAccount = () => {
	const navigate = useNavigate();

	const handleSign = () => {
		alert("해당 요청에 사인했습니다.");
    navigate("/");
	};

	return (
		<Box sx={{ p: 3 }}>
			<Stack spacing={3} direction="column" justifyContent="center">
				<Typography variant="h6">Multisig Transaction Sign</Typography>
				<Stack spacing={4} direction="column" justifyContent="center"
        sx={{ p: 2, m: 2 }}
        >
					<Typography variant="h7">요청 내역 :</Typography>
					<Typography variant="h7" color="primary">
						해당 요청에 사인 하시겠습니까?
					</Typography>
				</Stack>

				<Button variant="contained" onClick={handleSign} sx={{ m: "1" }}>
					사인하기
				</Button>
			</Stack>
		</Box>
	);
};

export default InitAccount;
