/*global chrome*/
import React, { useEffect, useState } from "react";
import { Typography, Box, AppBar, Toolbar, Button, IconButton, Avatar, Stack, Divider, Modal, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import Transaction from "../components/Transaction";
import TokenList from "../components/TokenList";
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import axios from 'axios';

const apiURL = process.env.REACT_APP_RESTFUL_API;

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

const getAddBalance = async (address) => {
	console.log(apiURL + `balance/${address}`);
    return await axios.get(apiURL + `balance/${address}`)
    .catch(function (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }).then((res)=>{return res.data});
}



const parseBalance = (list, assetId) => {
	console.log(2,list);
    if (list.length === 0) {return 0}
    else {
        for (let el of list) {
            if (el.assethash.slice(0,5) == assetId) {return el.amount;}
        }
    }
    return 0;
};

const Content = () => {
	const [open, setOpen] = React.useState(false);
	const [neo, setNeo] = useState(0);
	const [gas, setGas] = useState(0);

	const getData = async () => {
		const result = await getAddBalance(userAdd);
		console.log(1, result);
		const curGas = parseBalance(result,"0xd2a");
		const curNeo = parseBalance(result,"0xef4");
		console.log(curGas);
		console.log(curNeo);
		setGas(curGas);
		setNeo(curNeo);
	}
	
	useEffect(() => {
		
	}, []);


	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const [userAdd, setUserAdd] = useState();
	chrome.storage.local.get("address", (res) => {
		setUserAdd(res.address);
		getData(res.address);
		console.log(userAdd);
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
						<Typography variant="h6">Token Balance</Typography>
						<Typography>{`NEO : ${neo}`}</Typography>
						<Typography>{`Gas : ${gas}`}</Typography>
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
