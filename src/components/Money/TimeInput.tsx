import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.2);
        position: fixed;
        width: 100vw;
        height: 100vh;
        display: none;
        &.show {
            display: block;
        }
        .board {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 150px;
            border-radius: 20px;
            background: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            > label {
                flex-grow: 1;
                background: white;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                > input {
                    border: none;
                    border-radius: 4px;
                }
            }
            .buttons {
                width: 100%;
                display: flex;
                justify-content: space-around;
                border-top: 1px solid #b5b5b5;

                button {
                    width: 100%;
                    background: transparent;
                    border: none;
                    color: #1a73e8;
                }
            }
        }  
`;
type Props = {
  class: string
}
const TimeInput: React.FC<Props> = (props) => {
  return (
    <Wrapper className={props.class}>
      <div className="board">
        <label>
          <span>请选择日期</span>
          <input type="date"/>
        </label>
        <div className="buttons">
          <button>确认</button>
        </div>
      </div>
    </Wrapper>
)
}
export {TimeInput}
