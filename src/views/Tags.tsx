import Layout from "../components/Layout";
import React, {useState} from "react";
import {ConsumeType} from "../components/ConsumeType";
import styled from "styled-components";
import {DisplayTags} from "../components/Tags/DisplayTags";
import {AddTagButton} from "../components/Tags/AddTagButton";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    .title{
        text-align: center;
        background: #f3c623;
        font-weight: bold;
        font-size: 18px;
        padding-top: 8px;
    }
    .display {
      flex-grow: 1;
      overflow: auto;
    }
`
const Tags=()=> {
    const [type,setType] = useState<"-"|"+">("-")
    return  (
        <Layout>
            <Wrapper>
                <div className="title">分类设置</div>
                <ConsumeType type={type} onChange={type=>setType(type)}/>
                <DisplayTags type={type}/>
                <AddTagButton name="addNoCircle">添加类别</AddTagButton>
            </Wrapper>
        </Layout>
    );
}
export default Tags