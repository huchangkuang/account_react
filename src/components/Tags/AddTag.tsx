import React, {useState} from "react";
import styled from "styled-components";
import Layout from "../Layout";
import {EditTitle} from "./EidtTitle";
import {EditInput} from "./EditInput";
import {IconList} from "./IconList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  .iconList {
    flex-grow: 1;
    margin-top: 20px;
    overflow: auto;
  }
`
const AddTag = ()=>{
    const [value,setValue] = useState("")
    return (
      <Layout>
        <Wrapper>
          <EditTitle text="新增标签" save={()=>console.log("hi")}/>
          <EditInput value={value} onChange={value => setValue(value)}/>
          <IconList selectedId="0" changeSelectedId={id => console.log(id)}/>
        </Wrapper>
      </Layout>
    )
}
export {AddTag}