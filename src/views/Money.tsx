import Layout from "../components/Layout";
import React, {useState} from "react";
import {ConsumeType} from "../components/ConsumeType";
import {Receipt} from "../components/Money/Receipt";
import {NumberPad} from "../components/Money/NumberPad";
import {Classify} from "../components/Money/Classify";
import styled from "styled-components";
import {useTags} from "../hooks/useTags";
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
type Category = "-" | "+"
type ReceiptData = {
    amount:string,date:string, classify:string,note:string,type:Category
}
const Money=()=> {
    const {tags} = useTags()
    const [selectId,setSelectId] =useState<number>(0)
    const [receiptData,setReceiptData] = useState<ReceiptData>({amount:"0",date:"2020-7-15", classify:"餐饮",note:"",type:"-"})
    const changeID = (id:number)=>{
        setSelectId(id)
        onChange({classify:tags.filter(i=>i.id===id)[0].text})
    }
    const onChange = (obj:object) => {
        setReceiptData({...receiptData,...obj})
    }
    return (
        <Layout>
            <Wrapper>
                <ConsumeType type={receiptData.type} onChangeType={(type:Category)=>{onChange({type:type})}}/>
                <Classify onIdChange={(id:number)=>{changeID(id)}} id={selectId}/>
                <Receipt receiptData={receiptData}/>
                <NumberPad value={receiptData.amount} onChange={(value:string)=>{onChange({amount:value})}}/>
            </Wrapper>
        </Layout>
    );
}
export default Money