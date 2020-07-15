import Layout from "../components/Layout";
import React from "react";
import {TouchCard} from "../components/Target/TouchCard";
import {Remain} from "../components/Target/Remain";
import {Budget} from "../components/Target/Budget";
import styled from "styled-components";

const Wrapper = styled.div`
  .remain {
      margin: -10px auto;
  }
  .budget {
      margin: 40px auto;
  }
`

const Target=()=> {
    return  (
        <Layout>
            <Wrapper>
                <TouchCard/>
                <Remain/>
                <Budget/>
            </Wrapper>
        </Layout>
    );
}
export default Target