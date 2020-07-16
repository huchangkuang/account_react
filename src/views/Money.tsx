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
    amount:string,date:string, selectedId:0,note:string,type:Category
}
const Money=()=> {
    const {tags} = useTags()
    const [receiptData,setReceiptData] = useState<ReceiptData>({amount:"0",date:"2020-7-15", selectedId:0,note:"",type:"-"})
    const onChange = (obj:object) => {
        setReceiptData({...receiptData,...obj})
    }
    return (
        <Layout>
            <Wrapper>
                <ConsumeType type={receiptData.type}
                             onChange={type=>onChange({type:type,selectedId:tags.filter(i=>i.type===type)[0].id})}/>
                <Classify onChange={id => onChange({selectedId:id})} id={receiptData.selectedId} type={receiptData.type}/>
                <Receipt receiptData={receiptData}/>
                <NumberPad value={receiptData.amount} onChange={value=>onChange({amount:value})}
                           getNote={value => onChange({note:value})}/>
            </Wrapper>
        </Layout>
    );
}
export default Money