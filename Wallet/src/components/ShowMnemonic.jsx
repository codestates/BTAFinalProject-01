/*global chrome*/
import React from "react";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const ShowMnemonic = () => {
	
  return (
    <div>
      <Typography>ShowMnemonic</Typography>
      현재 로그인한 계정의 정보
      계정 이름, 주소, 주소 복사 버튼 
    </div>
  );
};

export default ShowMnemonic;
