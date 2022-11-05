import React, { useEffect, useState } from "react";
import { Link } from "react-chrome-extension-router";
import { AppBar, Box, Toolbar, Typography, IconButton, Switch, FormControlLabel, FormGroup, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Content from "../pages/Content";

const Navbar = () => {
	const [auth, setAuth] = React.useState(true);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
							<MenuIcon />
						</IconButton>
						<Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1 }}>
							<Link component={Content}>NEO</Link>
						</Typography>
						{auth && (
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
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorEl)}
									onClose={handleClose}>
									<MenuItem onClick={handleClose}>Profile</MenuItem>
									<MenuItem onClick={handleClose}>My account</MenuItem>
								</Menu>
							</div>
						)}
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
};

export default Navbar;
