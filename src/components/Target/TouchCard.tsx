import React from "react";
import styled from "styled-components";
import Icon from "../Icon";

const Wrapper = styled.div`
        background: #f3c623;
        border-radius: 0 0 16px 16px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        min-height: 94px;
        font-weight: bold;
        .keeping,.sum {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        .touch {
            background: white;
            padding: 4px 20px;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            .icon {
                width: 32px;
                height: 32px;
            }
            span {
                margin-left: 6px;
            }
        }
`
const TouchCard:React.FC = ()=> {
    return (
        <Wrapper>
            <div className="keeping">
                <div className="number">0</div>
                <div>已持续打卡</div>
            </div>
            <div className="touch">
                <Icon name="touchCard"/>
                <span>打卡</span>
            </div>
            <div className="sum">
                <div className="number">0</div>
                <div>记账总天数</div>
            </div>
        </Wrapper>
    )
}
export {TouchCard}