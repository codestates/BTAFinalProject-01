/*global chrome*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { experimentalStyled as styled } from '@mui/material/styles';
import { Typography, Stack, Button, Box, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const FindMnemonic = () => {
	const navigate = useNavigate();

  const handleFind= () => {  
  alert('계정이 복구 되었습니다.');
    navigate("/");
  };

	return (
		<Box sx={{ p: 3 }}>
			<Stack spacing={2} direction="column" justifyContent="center">
				<Typography variant="h6">Mnemonic 구문으로 계정 복구</Typography>
        <Typography variant="body1">니모닉 구문을 아래에 넣어주세요. </Typography>

        <Box sx={{ p: 1 }}>
          <Grid container spacing={2} columns={2}>
            {Array.from(Array(12)).map((_, index) => (
              <Grid item={true} xs={1} key={index}>
                <Item>xs=2</Item>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Button variant="contained" onClick={handleFind} sx={{ m: "1" }}>
          복구하기
        </Button>
			</Stack>
		</Box>
	);
};

export default FindMnemonic;