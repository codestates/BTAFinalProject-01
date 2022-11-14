/*global chrome*/
import React, { useEffect, useState } from "react";
import { Typography, Divider, Grid, Stack, Button, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

const MyAccount = () => {
	const [copied, setCopied] = useState(false);
	const [userAdd, setUserAdd] = useState();

	chrome.storage.local.get("address", (res) => {
		setUserAdd(res.address);
	});

	const handleCopy = () => {
		setCopied(true);
		console.log("copy mnemonic");
	};

	return (
		<Box sx={{ p: 3 }}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography id="modal-modal-title" variant="h5" sx={{ mb: 2 }}>
						My Account Info
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Stack spacing={3} direction="column" justifyContent="center" alignItems="center">
						<Avatar variant="square" alt="Neo" src={require("../assets/neoline.png")} sx={{ width: 40, height: 40 }} />
						<Typography variant="subtitle1">[ Check Address ]</Typography>
						<Typography variant="button" color="primary" >{userAdd}</Typography>
					</Stack>

					<Stack spacing={2} direction="row" justifyContent="flex-end">
						<CopyToClipboard text={userAdd} onCopy={handleCopy}>
							<Button variant="outlined" color="success" align="left" onCopy={handleCopy} size="small" sx={{ width: "30px", m: "1" }}>
								복사
							</Button>
						</CopyToClipboard>
					</Stack>
				</Grid>
				<Divider />
			</Grid>
		</Box>
	);
};

export default MyAccount;
