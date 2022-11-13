/*global chrome*/
import React from "react";
import { Typography, Box, Stack, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { Link } from "react-router-dom";

const MultiSigTransfer = () => {
	const [token, setToken] = React.useState("");

	const handleChange = (event) => {
		setToken(event.target.value);
	};

	return (
		<>
			<Box sx={{ p: 3 }}>
				<Stack spacing={2} direction="column" justifyContent="center">
					<Typography variant="h6">MultiSig Transfer</Typography>
					<Stack direction="column" justifyContent="space-evenly" alignItems="left" spacing={1}>
						<Typography align="left" variant="h7">
							보내는 사람
						</Typography>
						{/* 내 어카운트의 multisig address default로 넣기 */}
						<TextField id="FromAddress" defaultValue="my address" label="From Address" variant="outlined" size="small" />
					</Stack>
					<Stack direction="column" justifyContent="space-between" alignItems="left" spacing={1}>
						<Typography align="left" variant="h7">
							받는 사람
						</Typography>
						<TextField id="ToAddress" label="To Address" variant="outlined" size="small" />
					</Stack>
					<Stack direction="column" justifyContent="space-between" alignItems="left" spacing={1}>
						<Typography align="left" variant="h7">
							토큰 선택
						</Typography>
						<FormControl fullWidth size="small">
							<InputLabel id="demo-simple-select-helper-label">Token</InputLabel>
							<Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={token} label="Token" onChange={handleChange}>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>NEO</MenuItem>
								<MenuItem value={20}>Token1</MenuItem>
							</Select>
						</FormControl>
					</Stack>
					<Stack direction="column" justifyContent="space-between" alignItems="left" spacing={1}>
						<Typography align="left" t="h7">
							수수료
						</Typography>
						<TextField id="GasFee" label="0.0012 NEO" variant="outlined" size="small" disabled />
					</Stack>
          <Stack spacing={2} sx={{ pt:2 }}>
            <Button type="submit" variant="contained">Transfer</Button>
          </Stack>
				</Stack>
			</Box>
		</>
	);
};

export default MultiSigTransfer;
