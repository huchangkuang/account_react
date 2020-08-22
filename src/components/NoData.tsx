import React from "react";
import Icon from "./Icon";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon {
      width: 48px;
      height: 48px;
  }
`
const NoData:React.FC = ()=> {
  return (
    <Wrapper className="noData">
      <Icon name="write"/>
      <span>还没有记过账哦！快去记下一笔吧</span>
    </Wrapper>
  )
}
export {NoData}