import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
        background: #ffffff;
        width: 88%;
        min-height: 64px;
        border-radius: 10px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-weight: bold;
        padding: 0 20px;
        .time {
            text-align: center;
        }
        .line {
            width: 1px;
            background: #c4c4c4;
            height: 32px;
            margin-left: 10px;
        }
        .message {
            flex-grow: 1;
            display: flex;
            justify-content: space-around;
            align-items: center;
            li {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }
`
const Remain:React.FC = ()=> {
    return (
        <Wrapper className="remain">
            <div className="time">
                <div className="year">2020年</div>
                <div className="mouth">07月</div>
            </div>
            <div className="line"/>
            <ul className="message">
                <li>
                    <div className="description">收入</div>
                    <div className="number">0</div>
                </li>
                <li>
                    <div className="description">支出</div>
                    <div className="number">0</div>
                </li>
                <li>
                    <div className="description">结余</div>
                    <div className="number">0</div>
                </li>
            </ul>
        </Wrapper>
    )
}
export {Remain}