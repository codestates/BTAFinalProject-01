/*global chrome*/
import React from "react";
import { useState, useEffect } from "react";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import { Typography, Box, Select, Button, Modal, TextField, MenuItem, Stack } from "@mui/material";
import * as msAPI from "../APIs/multisigAPI";
import { Link } from "react-router-dom";

const CreateMultiSig = () => {
	// publickey 불러오기
	const [userPub, setUserPub] = useState();
	chrome.storage.local.get("publicKey", (res) => {
		setUserPub(res.publicKey,);
		console.log(userPub);
	});

	const myPubKey = userPub;
	const [pubkeyList, setPubkeyList] = useState([myPubKey, ""]);
	const [num, setNum] = useState(2);
	const [webHook, setWebHook] = useState("");
	const [multiSig, setMultiSig] = useState("");

	useEffect(() => {}, [multiSig]);

	const onAddDetailDiv = () => {
		setPubkeyList([...pubkeyList, ""]);
	};

	const onRemoveDetailDiv = () => {
		let pubkeyList2 = [...pubkeyList];
		if (pubkeyList.length != 2) {
			pubkeyList2.pop();
			setPubkeyList([...pubkeyList2]);
		}
	};

	const handleSelect = (event) => {
		setNum(event.target.value);
	};

	const handleWebHook = (event) => {
		setWebHook(event.target.value);
	};

	const generateAccount = async (event) => {
		const result = msAPI.createMultiSig(num, pubkeyList);
		console.log(result);
		setMultiSig(result);
		chrome.storage.local.set({ multiSig: result });
		chrome.storage.local.set({ webHook: webHook });
		const msg = `${pubkeyList} 을 이용하여 새로운 멀티시그 address가 만들어졌습니다! \n
		생성된 multisig address: ${multiSig} \n
		(${num}/${pubkeyList.length})의 서명이 있어야 트랜잭션이 발생합니다. \n`
		await msAPI.sendMSG( webHook, msg).then((res) => {console.log(res);})
	};

	const DetailList = () => {
		return (
			<Box sx={{ flexGrow: 1, pt: 2}}>
				{pubkeyList.map((item, i) => (
					<div key={i}>
						<label>{`User ${i + 1}`}</label>
						<div style={{ marginBottom: "20px" }}>
							<Typography variant="subtitle2">PubKey</Typography>
							<TextField
								size="small"
								disabled={i == 0 ? true : false}
								label={i == 0 ? myPubKey : ""}
								style={{ height: "2%", width: "90%" }}
								onChange={(e) => {
									let pubkeys = [...pubkeyList];
									pubkeys[i] = e.target.value;
									setPubkeyList([...pubkeys]);
								}}
							/>
						</div>
					</div>
				))}
			</Box>
		);
	};

	const SelectNum = () => {
		return (
			<Box sx={{ flexGrow: 1, p: 1 }}>
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
			</Box>
		);
	};

	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				<div style={{ marginTop: "10px" }}>
					{DetailList()}
					<Button onClick={onAddDetailDiv}>
						<AddCircleOutlinedIcon /> 추가
					</Button>
					<Button onClick={onRemoveDetailDiv}>
						<RemoveCircleOutlinedIcon /> 삭제
					</Button>
					{SelectNum()}
					<TextField
								label={"Discord WebHook Link"}
								style={{ height: "2%", width: "90%" }}
								onChange={handleWebHook}
						/>
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

export default CreateMultiSig;
