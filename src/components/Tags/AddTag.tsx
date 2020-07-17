import React, {useState} from "react";
import styled from "styled-components";
import Layout from "../Layout";
import {EditTitle} from "./EidtTitle";
import {EditInput} from "./EditInput";
import {IconList} from "./IconList";
import {useType} from "../../hooks/useType";
import {useTags} from "../../hooks/useTags";

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
    const [selectedName,setSelectedName] = useState("")
    const {type} =useType()
    const {createTag} = useTags()
    return (
      <Layout>
        <Wrapper>
          <EditTitle text="新增标签" save={()=>createTag(selectedName,value,type)}/>
          <EditInput value={value} onChange={value => setValue(value)}/>
          <IconList selectedName={selectedName} getIconName={name => setSelectedName(name)}/>
        </Wrapper>
      </Layout>
    )
}
export {AddTag}