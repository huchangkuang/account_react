import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
        width: 100%;
        .buttons {
            display: flex;
            flex-wrap: wrap;
            box-shadow: 0px -1px 2px rgba(0, 0, 0, 0.25);
            button {
                width: 25%;
                height: 48px;
                background: transparent;
                border: none;
            }
            & :nth-child(1) {
                background: #f2f2f2;
            }
            & :nth-child(2), & :nth-child(5) {
                background: #e8e8e8;
            }
            & :nth-child(3), & :nth-child(6), & :nth-child(9) {
                background: #dedede;
            }
            & :nth-child(4), & :nth-child(7), & :nth-child(10), & :nth-child(13) {
                background: #d3d3d3;
            }
            & :nth-child(8), & :nth-child(11), & :nth-child(14) {
                background: #c9c9c9;
            }
            & :nth-child(12), & :nth-child(15) {
                background: #bfbfbf;
            }
            & :nth-child(16) {
                background: #b5b5b5;
            }
        }
`
const NumberPad:React.FC = ()=>{
    return (
        <Wrapper>
            <div className="buttons">
                <button >1</button>
                <button >2</button>
                <button >3</button>
                <button >删除</button>
                <button >4</button>
                <button >5</button>
                <button >6</button>
                <button >清空</button>
                <button >7</button>
                <button >8</button>
                <button >9</button>
                <button >备注</button>
                <button >.</button>
                <button >0</button>
                <button >今天</button>
                <button className="ok">确认</button>
            </div>
        </Wrapper>
    )
}
export {NumberPad};