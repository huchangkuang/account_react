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
            transform: translate(-50%,-50%);
            width: 300px;
            height: 150px;
            border-radius: 20px;
            background: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            label {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                flex-grow: 1;
                > span {
                    font-weight: bold;
                }
            }
            .buttons {
                padding: 10px;
                width: 100%;
                display: flex;
                justify-content: space-around;
                border-top:1px solid #b5b5b5;
                box-shadow: none;
                button {
                    background: transparent;
                    border: 1px solid #333333;
                    border-radius: 4px;
                    text-align: center;
                    min-width: 40%;
                    height: 24px;
                    padding: 1px;
                    &:first-child {

                    }
                    &:last-child {
                        background: #424242;
                        color: white;
                    }
                }
            }
        }
`;
type Props = {
  children: string,
  show: string,
  cancel:(value:string)=> void
}
const PopWarning: React.FC<Props> = (props) => {
  const display = props.show
  const cancel = () => {
    props.cancel("hide")
  };
  return (
    <Wrapper className={display}>
      <div className="board">
        <label>
          <span>{props.children}</span>
        </label>
        <div className="buttons">
          <button onClick={cancel}>认错！</button>
          <button onClick={cancel}>我知道了</button>
        </div>
      </div>
    </Wrapper>
  );
};
export {PopWarning}