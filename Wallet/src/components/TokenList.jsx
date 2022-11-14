/*global chrome*/
import React, { useEffect, useState } from "react";
import { Typography, Divider, Grid, List, ListItemAvatar, ListItem, ListItemText, Avatar, styled } from "@mui/material";
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import { Link } from "react-router-dom";

const Demo = styled("div")(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
}));

const TokenList = () => {

	const [userNeo, setUserNeo] = useState();
	const [userGas, setUserGas] = useState();
	chrome.storage.local.get("neoBal", (res) => {
		setUserNeo(res.neoBal);
  });
	chrome.storage.local.get("gasBal", (res) => {
		setUserGas(res.gasBal);
  });

	return (
		<div>
			<Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
				Token List
			</Typography>

			<Divider />
			<Grid container spacing={2}>
				<Grid item xs={12}>
          {/* Demo 맵핑해서 리스트업 */}
					<Demo>
						<List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
							<ListItem>
								<ListItemAvatar>
									<Avatar><PaidRoundedIcon/></Avatar>
								</ListItemAvatar>
								<ListItemText primary="NEO" secondary={userNeo} />
							</ListItem>
						</List>
						<Divider />
					</Demo>
          <Demo>
						<List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
							<ListItem>
								<ListItemAvatar>
									<Avatar><PaidRoundedIcon/></Avatar>
								</ListItemAvatar>
								<ListItemText primary="GAS" secondary={userGas} />
							</ListItem>
						</List>
						<Divider />
					</Demo>
				</Grid>
        
			</Grid>

			<br />
		</div>

		//   Modal
		//   보유한 토큰 목록, 양
		//   토큰 추가
	);
};

export default TokenList;
