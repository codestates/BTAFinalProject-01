/*global chrome*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { experimentalStyled as styled } from '@mui/material/styles';
import { Typography, Stack, Button, Box, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const ShowMnemonic = () => {
	const navigate = useNavigate();
	const [savedPassword, setSavedPassword] = useState();

	// chrome.storage.local.get("Nep2Key", (res) => {
	// 	setSavedPassword(res.Nep2Key);
	// 	console.log(res.Nep2Key);
	// 	console.log(savedPassword);
	// });

  const handleCopy = () => {
    console.log('copy mnemonic')
  };

  const handleContent= () => {
    navigate("/content");
  };

	return (
		<Box sx={{ p: 3 }}>
			<Stack spacing={2} direction="column" justifyContent="center">
				<Typography variant="h6">Mnemonic</Typography>
        <Typography variant="body1">니모닉 구문이 생성 되었습니다!</Typography>
        <Typography variant="body1">절대 다른 사람과 공유하지 마세요.</Typography>
				<Typography>Mnemonic is {savedPassword}</Typography>
        {/* <Box sx={{ p: 2 }}>
          <Grid container spacing={2} columns={4}>
            {Array.from(Array(12)).map((_, index) => (
              <Grid xs={1} key={index}>
                <Item>xs=2</Item>
              </Grid>
            ))}
          </Grid>
        </Box> */}
        <Button variant="outlined" color="success" align="left" onClick={handleCopy} size="small" sx={{ width:"30px", m: "1" }}>
          복사
        </Button>
        <Button variant="contained" onClick={handleContent} sx={{ m: "1" }}>
          시작하기
        </Button>
			</Stack>
		</Box>
	);
};

export default ShowMnemonic;
