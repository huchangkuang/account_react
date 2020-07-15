import Layout from "../components/Layout";
import React from "react";
import {ConsumeType} from "../components/ConsumeType";
import styled from "styled-components";
import {DisplayTags} from "../components/Tags/DisplayTags";
import {EditTagButton} from "../components/Tags/EditTagButton";

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
    return  (
        <Layout>
            <Wrapper>
                <div className="title">分类设置</div>
                <ConsumeType/>
                <DisplayTags/>
                <EditTagButton name="addNoCircle">添加类别</EditTagButton>
            </Wrapper>
        </Layout>
    );
}
export default Tags