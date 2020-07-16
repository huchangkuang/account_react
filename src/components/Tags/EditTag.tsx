import React from "react";
import styled from "styled-components";
import Layout from "../Layout";
import {RemoveTagButton} from "./RemoveTagButton";
import {EditTitle} from "./EidtTitle";
import {IconList} from "./IconList";
import {EditInput} from "./EditInput";

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
const EditTag = ()=>{
    return (
      <Layout>
        <Wrapper>
          <EditTitle text="编辑标签"/>
          <EditInput value=""/>
          <IconList/>
          <RemoveTagButton/>
        </Wrapper>
      </Layout>
    )
}
export {EditTag}