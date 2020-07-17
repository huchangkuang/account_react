import React from "react";
import {useHistory} from "react-router-dom"
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
  > button {
    border: none;
    font-weight: bold;
    background: transparent;
    width: 32px;
    .icon {
    width: 16px;
    height: 16px;
    }
  }
  > span {
    font-size: 18px;
    font-weight: bold;
  }
`
type Props = {
  text:string
  save:()=>void
}
const EditTitle:React.FC<Props> = (props)=>{
  const history = useHistory()
  const back = ()=>{
    history.goBack()
  }
  return (
    <Wrapper>
      <button onClick={back}><Icon name="left"/></button>
      <span>{props.text}</span>
      <button onClick={props.save}>保存</button>
    </Wrapper>
  )
}
export {EditTitle}