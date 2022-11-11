/*global chrome*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const ShowMnemonic = () => {
  const navigate = useNavigate();
  const [savedPassword, setSavedPassword] = useState();

  chrome.storage.local.get("Nep2Key", (res) => {
    setSavedPassword(res.Nep2Key);
    console.log(res.Nep2Key);
    console.log(savedPassword);
  });
	
  return (
    <div>
      <Typography>ShowMnemonic</Typography>
      
      <Button variant="outlined" sx={{ m: "1em 0" }}>
        잠금 해제
      </Button>
      <Typography>{savedPassword}</Typography>
    </div>
  );
};

export default ShowMnemonic;
