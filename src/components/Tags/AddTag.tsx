import React from "react";
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
    return (
      <Layout>
        <Wrapper>
          <EditTitle text="新增标签"/>
          <EditInput value=""/>
          <IconList/>
        </Wrapper>
      </Layout>
    )
}
export {AddTag}