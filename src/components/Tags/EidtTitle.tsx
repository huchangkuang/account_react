import React from "react";
import styled from "styled-components";
import Icon from "../Icon";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  background: #f3c623;
  width: 100vw;
  padding: 10px 20px;
  .icon {
    width: 16px;
    height: 16px;
  }
  > span {
    font-size: 18px;
    font-weight: bold;
  }
  > button {
    border: none;
    font-weight: bold;
    background: transparent;
  }
`
type Props = {
  text:string
}
const EditTitle:React.FC<Props> = (props)=>{
  return (
    <Wrapper>
      <Icon name="left"/>
      <span>{props.text}</span>
      <button>保存</button>
    </Wrapper>
  )
}
export {EditTitle}