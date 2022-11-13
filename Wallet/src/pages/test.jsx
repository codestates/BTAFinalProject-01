/*global chrome*/
import React from "react";
import { useState, useEffect } from "react";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import { Typography, Box, AppBar, Select, Button, Modal, TextField, MenuItem } from "@mui/material";
import * as ms from "../APIs/MultiSigAcc";
import { Link } from "react-router-dom";

const Test = () => {
	const myPubKey = "033a4d051b04b7fc0230d2b1aaedfd5a84be279a5361a7358db665ad7857787f1b";
	const [pubkeyList, setPubkeyList] = useState([myPubKey, ""]);
	const [idList, setIdList] = useState(["", ""]);
	const [num, setNum] = useState(2);
	const [multiSig, setMultiSig] = useState("");

	useEffect(() => {}, [multiSig]);

	const onAddDetailDiv = () => {
		setPubkeyList([...pubkeyList, ""]);
		setIdList([...idList, ""]);
	};

	const handleSelect = (event) => {
		setNum(event.target.value);
	};

	const onRemoveDetailDiv = () => {
		let pubkeyList2 = [...pubkeyList];
		if (pubkeyList.length != 2) {
			pubkeyList2.pop();
			setPubkeyList([...pubkeyList2]);
		}

		let idList2 = [...idList];
		if (idList.length != 2) {
			idList2.pop();
			setIdList([...idList2]);
		}
	};

	const generateAccount = (event) => {
		const result = ms.createMultiSig(num, pubkeyList);
		console.log(result);
		setMultiSig(result);
	};

	const DetailList = () => {
		return (
			<div>
				{pubkeyList.map((item, i) => (
					<div key={i}>
						<label style={{ marginTop: "20px" }}>{`User ${i + 1}`}</label>
						<div style={{ marginBottom: "20px" }}>
							<Typography>PubKey</Typography>
							<TextField
								disabled={i == 0 ? true : false}
								label={i == 0 ? myPubKey : ""}
								style={{ height: "2%", width: "90%" }}
								onChange={(e) => {
									let pubkeys = [...pubkeyList];
									pubkeys[i] = e.target.value;
									setPubkeyList([...pubkeys]);
								}}
							/>
							<Typography>Slack ID</Typography>
							<TextField
								style={{ height: "2%", width: "90%" }}
								onChange={(e) => {
									let id = [...idList];
									id[i] = e.target.value;
									setIdList([...id]);
								}}
							/>
						</div>
					</div>
				))}
			</div>
		);
	};

	const SelectNum = () => {
		return (
			<div>
				<span style={{ marginRight: "30px" }}>{"Select signing threshold "}</span>
				<span>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={num}
						label="Sining threshhold"
						style={{ height: "25px" }}
						onChange={handleSelect}>
						{pubkeyList.map((item, i) => (i > 0 ? <MenuItem value={i + 1}>{i + 1}</MenuItem> : <div></div>))}
					</Select>
				</span>
			</div>
		);
	};

	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				<div style={{ marginTop: "80px" }}>
					{DetailList()}
					<Button onClick={onAddDetailDiv}>
						<AddCircleOutlinedIcon /> 추가
					</Button>
					<Button onClick={onRemoveDetailDiv}>
						<RemoveCircleOutlinedIcon /> 삭제
					</Button>
					{SelectNum()}
					<div style={{ marginTop: "20px", marginLeft: "10%" }}>
						<Button variant="contained" onClick={generateAccount}>
							{"Create multiSig account"}
						</Button>
					</div>
					<div>{`Here is multisig account : ${multiSig}`}</div>
				</div>
			</Box>
		</div>
	);
};

export default Test;
