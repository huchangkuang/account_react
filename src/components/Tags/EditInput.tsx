import React from "react";
import styled from "styled-components";

const Label = styled.label`
      width: 100%;
      border-bottom: 1px solid #c4c4c4;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      span {
          width: 20%;
      }
      input {
          width: 100%;
          border: none;
          border-bottom: 1px solid #333333;
          background: transparent;
          flex-grow: 1;
          text-align: center;
       }
`
type Props = {
  value:string
}
const EditInput:React.FC<Props> = (props)=>{
  return (
    <Label>
      <span>标签名</span>
      <input type="text" value={props.value} placeholder="输入类别名称，建议不超过四个汉字"/>
    </Label>
  )
}
export {EditInput}