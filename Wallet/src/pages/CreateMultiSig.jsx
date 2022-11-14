/*global chrome*/
import React from "react";
import { useState, useEffect } from "react";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import { Typography, Box, Select, Button, Modal, TextField, MenuItem, Stack } from "@mui/material";
import * as msAPI from "../APIs/multisigAPI";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CreateMultiSig = () => {
	const navigate = useNavigate();
	// publickey 불러오기
	const [pubkeyList, setPubkeyList] = useState(["", ""]);
	const getData = () => {
		chrome.storage.local.get("publicKey", (res) => {
			setPubkeyList([res.publicKey,""]);
		});
	}
	const [num, setNum] = useState(2);
	const [multiSig, setMultiSig] = useState("");
	const [webHook, setWebHook] = useState("");

	console.log(11,pubkeyList);

	useEffect(() => {getData()}, [multiSig]);

	const onAddDetailDiv = () => {
		setPubkeyList([...pubkeyList, ""]);
	};

	const handleSelect = (event) => {
		setNum(event.target.value);
	};

	const handleWebHook = (event) => {
		setWebHook(event.target.value);
	}

	const onRemoveDetailDiv = () => {
		let pubkeyList2 = [...pubkeyList];
		if (pubkeyList.length != 2) {
			pubkeyList2.pop();
			setPubkeyList([...pubkeyList2]);
		}
	};

	const generateAccount = async (event) => {
		console.log(num,pubkeyList);
		const result = msAPI.createMultiSig(num, pubkeyList);
		console.log(result);
		setMultiSig(result);
		chrome.storage.local.set({ multiAdd: result.address });
		chrome.storage.local.set({ multiHash: result.scriptHash });
		chrome.storage.local.set({ webHook: webHook });
		chrome.storage.local.set({ multiJson: result.export()});
		const msg = `${pubkeyList}을 이용하여 새로운 멀티시그 address가 만들어졌습니다! \n
		생성된 multisig address: ${result.address} \n
		(${num}/${pubkeyList.length})의 서명이 있어야 트랜잭션이 발생합니다. \n`
		await msAPI.sendMSG( webHook, msg).then((res) => {console.log(res);});
		alert('multiSig address 생성');
		navigate("/content");
	};

	const DetailList = () => {
		return (
			<Box sx={{ flexGrow: 1, pt: 2}}>
				{pubkeyList.map((item, i) => (
					<div key={i}>
						<label style={{ marginTop: "20px" }}>{`User ${i + 1}`}</label>
						<div style={{ marginBottom: "20px" }}>
							<Typography variant="subtitle2">PubKey</Typography>
							<TextField
								size="small"
								disabled={i == 0 ? true : false}
								label={i == 0 ? pubkeyList[0] : ""}
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
		<Box sx={{ flexGrow: 1, p: 3 }}>
				<Typography variant="button">Here is multisig account</Typography>
				<br/>
				<Typography variant="body2" color="primary">{`: ${multiSig}`}</Typography>
				{DetailList()}
				<Stack direction="row" justifyContent="center">
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
					<div>{`Here is multisig account : ${multiSig.address}`}</div>
				</Stack>
		</Box>
	);
};

export default CreateMultiSig;