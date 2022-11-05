import React from "react";
import { Typography, Box, AppBar, Toolbar, Button, IconButton, Avatar, Stack, Divider, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import Transaction from "../components/Transaction";
import TokenList from "../components/TokenList";
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 300,
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

	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar variant="dense">
						<Button color="inherit" size="small">
							Account Name
						</Button>
						<Typography variant="body1" component="div" align="right" sx={{ flexGrow: 1 }}>
							Address
						</Typography>
					</Toolbar>
				</AppBar>
			</Box>
			<Box sx={{ p: 3 }}>
				<Stack spacing={3} direction="column" justifyContent="center" alignItems="center">
					<Button variant="outlined" onClick={handleOpen}>
						Token List
					</Button>
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
					<Typography>TOKEN NAME</Typography>
					<Stack spacing={1} direction="row" justifyContent="center" alignItems="center">
						<Typography variant="h6">Token Balance</Typography>
						<Typography>NEO</Typography>
					</Stack>
					<Button variant="contained" component={Link} to="/transfer">
						Transfer
					</Button>
				</Stack>
			</Box>
			<Divider />

			<Transaction />
		</div>
	);
};

export default Content;
