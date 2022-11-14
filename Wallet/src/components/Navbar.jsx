/*global chrome*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, IconButton, Menu, MenuItem, Divider, ListItemIcon, FormControl, Select, Avatar, Modal, Stack, Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import MyAccount from "./MyAccount.jsx";

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

const Navbar = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [network, setNetwork] = React.useState("30");
	const navigate = useNavigate();

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleNetwork = (event) => {
		setNetwork(event.target.value);
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const MenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		chrome.storage.local.set({ login: false });
		alert("로그아웃");
		navigate("/login");
	};

	const handleInit = () => {
		alert("로그아웃");
		navigate("/initaccount");
	};

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar variant="dense">
						<FormControl variant="standard" sx={{ minWidth: 60 }} size="small">
							<Select id="select-network" value={network} onChange={handleNetwork}>
								<MenuItem value={10}>
									<Typography variant="subtitle2">Mainnet</Typography>
								</MenuItem>
								<MenuItem value={20}>
									<Typography variant="subtitle2">Testnet</Typography>
								</MenuItem>
								<MenuItem value={30}>
									<Typography variant="subtitle2">Private</Typography>
								</MenuItem>
							</Select>
						</FormControl>

						<IconButton component={Link} to="/" sx={{ flexGrow: 1, px: 0 }}>
							<Avatar variant="square" alt="Neo" src={require("../assets/neologo.png")} sx={{ width: 24, height: 24 }} />
						</IconButton>

						<div>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit">
								<AccountCircle />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorEl)}
								onClose={MenuClose}>
								<MenuItem onClick={handleOpen}>My account</MenuItem>
								<Modal open={open} onClose={handleClose} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
									<Box sx={style}>
										<MyAccount />
										<Stack direction="row" justifyContent="flex-end" spacing={2}>
											<Button color="info" variant="contained" onClick={handleClose}>
												Close
											</Button>
										</Stack>
									</Box>
								</Modal>
								<Divider />
								<MenuItem>
									<ListItemIcon>
										<PersonAdd fontSize="small" />
									</ListItemIcon>
									New account
								</MenuItem>
								<MenuItem component={Link} to="/createmultisig">
									<ListItemIcon>
										<PersonAdd fontSize="small" />
									</ListItemIcon>
									New Multisig
								</MenuItem>
								<MenuItem onClick={handleLogout}>
									<ListItemIcon>
										<Logout fontSize="small" />
									</ListItemIcon>
									Logout
								</MenuItem>
							</Menu>
						</div>
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
};

export default Navbar;
