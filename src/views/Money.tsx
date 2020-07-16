import Layout from "../components/Layout";
import React, {useState} from "react";
import {ConsumeType} from "../components/ConsumeType";
import {Receipt} from "../components/Money/Receipt";
import {NumberPad} from "../components/Money/NumberPad";
import {Classify} from "../components/Money/Classify";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .type {
    min-height: 54px;
  }
`
const Money=()=> {
    const [receiptData,setReceiptData] = useState({amount:"0",date:"2020-7-15",classify:"餐饮",note:"",type:"-"})
    return (
        <Layout>
            <Wrapper>
                <ConsumeType/>
                <Classify/>
                <Receipt amount={receiptData.amount}/>
                <NumberPad value={receiptData.amount} onChange={(value:string)=>{setReceiptData(
                    {...receiptData,amount:value}
                )}}/>
            </Wrapper>
        </Layout>
    );
}
export default Money