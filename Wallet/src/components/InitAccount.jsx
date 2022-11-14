/*global chrome*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Stack, Button, Box, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const InitAccount = () => {
	const navigate = useNavigate();

  const handleInit= () => {
    chrome.storage.local.set({ login: null});
    chrome.storage.local.set({ address: null });
    chrome.storage.local.set({ encryptedAcc: [] });
    chrome.storage.local.set({ balance: [] });
    chrome.storage.local.set({ transfer: null });
    chrome.storage.local.set({ decryptedAcc: [] });
    
  alert('지갑이 초기화 되었습니다');
    navigate("/");
  };

	return (
		<Box sx={{ p: 3 }}>
			<Stack spacing={2} direction="column" justifyContent="center">
				<Typography variant="h6">Init Account Info</Typography>
        <Typography variant="body1">지갑을 삭제 하시겠습니까?</Typography>
        <Typography variant="body1">한번 삭제된 정보는 복구할 수 없습니다.</Typography>
        
        <Button variant="contained" onClick={handleInit} sx={{ m: "1" }}>
          초기화하기
        </Button>
			</Stack>
		</Box>
	);
};

export default InitAccount;
