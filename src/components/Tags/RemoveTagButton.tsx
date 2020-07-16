import React from "react";
import styled from "styled-components";
import Icon from "../Icon";

const Wrapper=styled.div`
      > button {
         width: 100vw;
         display: flex;
         justify-content: center;
         align-items: center;
         border: none;
         border-top: 1px solid #c4c4c4;
         padding: 8px 0;
         background: white;
         font-size: 16px;
         > .icon {
            width: 24px;
            height: 24px;
         }
    }
`

const RemoveTagButton = ()=>{
  return (
    <Wrapper>
      <button>
        <Icon name="delete"/>
        删除标签
      </button>
    </Wrapper>
  )
}
export {RemoveTagButton}