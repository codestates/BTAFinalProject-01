/*global chrome*/
import React from "react";
import { Typography, Divider, Grid, Stack, Avatar, Box } from "@mui/material";
import { Link } from "react-router-dom";

const MyAccount = () => {
	return (
		<Box sx={{ p: 3 }}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
						My Account Info
					</Typography>
				</Grid>
				<Divider />

				<Stack spacing={3} direction="column" justifyContent="center" alignItems="center">
					<Typography>Check Address :</Typography>
				</Stack>
			</Grid>
		</Box>
	);
};

export default MyAccount;
