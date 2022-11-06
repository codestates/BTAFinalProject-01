import React from "react";
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
											status
										</Typography>
										<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
											method
										</Typography>
									</Stack>
									<Typography sx={{ fontSize: 18 }} color="black" gutterBottom>
										0 NEO
									</Typography>
									<Typography variant="body2" color="text.secondary">
										# block number / timestamp
									</Typography>
								</CardContent>
								<CardActions>
									<Button size="small">Read Details - explorer 연결</Button>
								</CardActions>
							</Card>
						</Box>
						<Box>
							<Card sx={cardStyle}>
								<CardContent>
									<Stack spacing={1} direction="row">
										<Typography sx={{ fontSize: 14 }} color="green" gutterBottom>
											status
										</Typography>
										<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
											method
										</Typography>
									</Stack>
									<Typography sx={{ fontSize: 18 }} color="black" gutterBottom>
										0 NEO
									</Typography>
									<Typography variant="body2" color="text.secondary">
										# block number / timestamp
									</Typography>
								</CardContent>
								<CardActions>
									<Button size="small">Read Details - explorer 연결</Button>
								</CardActions>
							</Card>
						</Box>
						<Box>
							<Card sx={cardStyle}>
								<CardContent>
									<Stack spacing={1} direction="row">
										<Typography sx={{ fontSize: 14 }} color="green" gutterBottom>
											status
										</Typography>
										<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
											method
										</Typography>
									</Stack>
									<Typography sx={{ fontSize: 18 }} color="black" gutterBottom>
										0 NEO
									</Typography>
									<Typography variant="body2" color="text.secondary">
										# block number / timestamp
									</Typography>
								</CardContent>
								<CardActions>
									<Button size="small">Read Details - explorer 연결</Button>
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
