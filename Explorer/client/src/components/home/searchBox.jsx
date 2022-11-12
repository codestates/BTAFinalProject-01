import React, { useState, useEffect } from 'react'
import { Input, Space } from 'antd';
import Neon from "@cityofzion/neon-js";

const { Search } = Input;

const onSearch = (val) => {
    const isAdd = Neon.is.address(val);
    const isTx = (val.slice(0,2) === "0x" && val.length == 66);
    const isBlockNum = (Number.isInteger(Number(val)) && val.length < 66);
    console.log(isAdd, isTx, isBlockNum);
    if (isAdd == false && isTx == false && isBlockNum == false) {
        window.alert(["No such address, block index and tx hash!"]);
    } else if ( isAdd == true) {
        window.location.href = `http://localhost:3000/addresses/${val}`
    } else if ( isTx == true) {
        window.location.href = `http://localhost:3000/txs/${val}`
    } else if (isBlockNum) {
        window.location.href = `http://localhost:3000/blocks/${val}`
    }
};

function SearchBox() {
    return (
        <div style={{width:"70%"}}>
            <h2>Search</h2>
            <Search
                placeholder="Search by Address, Tx hash, Block index"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
        </div>
    )
}

export default SearchBox;