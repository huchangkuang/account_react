import Layout from "../components/Layout";
import React from "react";
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
    return (
        <Layout>
            <Wrapper>
                <ConsumeType/>
                <Classify/>
                <Receipt/>
                <NumberPad/>
            </Wrapper>
        </Layout>
    );
}
export default Money