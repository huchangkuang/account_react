import React, {useState} from "react";
import {useParams} from "react-router-dom"
import styled from "styled-components";
import Layout from "../Layout";
import {RemoveTagButton} from "./RemoveTagButton";
import {EditTitle} from "./EidtTitle";
import {IconList} from "./IconList";
import {EditInput} from "./EditInput";
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
type Params = {
  id:string
}
const EditTag = ()=> {
  const {findTag} = useTags()
  let {id} = useParams<Params>()
  const tag = findTag(id)
  const [selectedName,setSelectedName] =useState(tag.name)
  const [value,setValue] = useState(tag.text)
  const onChange=(value:string)=>{
    setValue(value)
  }
  const save = ()=>{
    tag.text = value
    tag.name = selectedName
  }
    return (
      <Layout>
        <Wrapper>
          <EditTitle text="编辑标签" save={()=>save()}/>
          <EditInput value={value} onChange={value => onChange(value)}/>
          <IconList selectedName={selectedName} getIconName={name=>setSelectedName(name)}/>
          <RemoveTagButton/>
        </Wrapper>
      </Layout>
    )
}
export {EditTag}