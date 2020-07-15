import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 90%;
        display: flex;
        align-items: center;
        flex-direction: column;
        .top-bar {
            background: rgb(233, 233, 233);
            height: 16px;
            border-radius: 8px;
            width: 100%;
            display: flex;
            justify-content: center;
            .top-in {
                width: 98%;
                height: 6px;
                background: rgb(218, 218, 218);
                margin-top: 7px;
                border-radius: 3px;
            }
        }
        .paper {
            border-top: 4px solid rgb(233, 233, 233);
            background: white;
            width: 95%;
            margin-top: -5px;
            min-height: 100px;
            box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
            .amount {
                display: flex;
                justify-content: space-between;
                padding: 2px 10px;
                font-size: 36px;
                font-family: Consolas, monospace;
                border-bottom: 1px solid #e9e9e9;
            }
            .bar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2px 10px;
            }
            .notes {
                .note-content {
                    max-width: 80%;
                    overflow-wrap: break-word;
                }
            }
            .time {
                padding: 2px 10px;
            }

            .kind {
                padding: 2px 10px;
            }
  }
`
const Receipt:React.FC = ()=>{
    return (
        <Wrapper>
            <div className="top-bar">
                <div className="top-in"/>
            </div>
            <div className="paper">
                <div className="amount">
                    <div className="text">金额：</div>
                    <div className="output">0</div>
                </div>
                <div className="bar time">
                    <div>日期：</div>
                    <div className="time-content">2020-7-15</div>
                </div>
                <div className="bar kind">
                    <div>分类：</div>
                    <div className="kind-content">餐饮</div>
                </div>
                <div className="bar notes">
                    <div>备注：</div>
                    <div className="note-content"/>
                </div>
            </div>
        </Wrapper>
    )
}
export {Receipt}