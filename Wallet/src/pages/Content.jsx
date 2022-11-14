/*global chrome*/
import React, { useEffect, useState } from "react";
import { Typography, Box, AppBar, Toolbar, Button, IconButton, Avatar, Stack, Divider, Modal, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import Transaction from "../components/Transaction";
import TokenList from "../components/TokenList";
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 280,
	bgcolor: "background.paper",
	border: "1px",
	borderRadius: "15px",
	boxShadow: 10,
	p: 3,
};

const Content = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	// const [fromAddress, setFromAddress] = useState("");
	
	// // 웹에서 볼 때 주석 처리 !!
	const [userBalance, setUserBalance] = useState();
  chrome.storage.local.get("userBal", (res) => {
    setUserBalance(res.userBal);
  });
	useEffect(() => {
		console.log(userBalance);
	}, [userBalance]);


	const [userAdd, setUserAdd] = useState();
	chrome.storage.local.get("address", (res) => {
		setUserAdd(res.address);
  });


	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar variant="dense">
					<Typography variant="caption" align="left" sx={{ flexGrow: 1 }}>
							ADDRESS: 
						</Typography>
						<Typography variant="caption" align="right" sx={{ flexGrow: 1 }}>
							{userAdd}
						</Typography>
					</Toolbar>
				</AppBar>
			</Box>
			<Box sx={{ p: 3 }}>
				<Stack spacing={3} direction="column" justifyContent="center" alignItems="center">
					<Chip label="Token List" variant="outlined" color="success" onClick={handleOpen} />
					<Modal open={open} onClose={handleClose} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
						<Box sx={style}>
							<TokenList />
							<Stack direction="row" justifyContent="flex-end" spacing={2}>
								<Button color="info" variant="contained" onClick={handleClose}>
									Close
								</Button>
							</Stack>
						</Box>
					</Modal>

					<Avatar><PaidRoundedIcon/></Avatar>
					<Stack spacing={1} direction="row" justifyContent="center" alignItems="center">
						<Typography variant="h6" color="primary">{userBalance}</Typography>
						<Typography>NEO</Typography>
					</Stack>
					<Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
						<Button fullWidth size="small" variant="contained" component={Link} to="/transfer">
							Transfer
						</Button>
						<Button fullWidth size="small" variant="contained" component={Link} to="/multisigtransfer">
							MultiSig Transfer
						</Button>
						<Button fullWidth size="small" variant="contained" component={Link} to="/signtransaction">
							Get MultiSig TX
						</Button>
					</Stack>
					
				</Stack>
				
			</Box>
			<Divider />

			<Transaction />
		</div>
	);
};

export default Content;
