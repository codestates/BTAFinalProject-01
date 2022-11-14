/*global chrome*/
import React, { useEffect, useState } from "react";
import { Typography, Box, Stack, Card, CardActions, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { borderRadius } from "@mui/system";

const cardStyle = {
	width: "100%",
	border: "1px",
	borderRadius: "15px",
	boxShadow: 2,
	p: 1,
	textAlign: "left",
};

const Transaction = () => {

	const [userTran, setUserTran] = useState();
  chrome.storage.local.get("scriptHash", (res) => {
    setUserTran(res.scriptHash);
  });
	useEffect(() => {
		console.log(userTran);
	}, [userTran]);

	return (
		<div>
			<React.Fragment>
				<Box sx={{ p: 3 }}>
					<Stack spacing={1} direction="column" justifyContent="center">
						<Typography align="left" variant="h6">
							Transaction List
						</Typography>
						
						<Box>
							<Card sx={cardStyle}>
								<CardContent>
									<Stack spacing={1} direction="row">
										<Typography sx={{ fontSize: 14 }} color="green" gutterBottom>
											Success
										</Typography>
										<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
											Transfer
										</Typography>
									</Stack>
									<Typography sx={{ fontSize: 18 }} color="black" gutterBottom>
										1 NEO
									</Typography>
									<Typography variant="body2" color="text.secondary">
										# 11 - 11/13/2022 11:05
									</Typography>
								</CardContent>
								<CardActions>
									<Button size="small" href="http://localhost:3000/">Read Details - explorer 연결</Button>
								</CardActions>
							</Card>
						</Box>
						
						
					</Stack>
				</Box>
			</React.Fragment>
		</div>
	);
};

export default Transaction;
