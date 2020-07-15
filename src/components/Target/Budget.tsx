import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
   background: white;
        min-height: 160px;
        width: 88%;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        .budget-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 25px;

            .setBudget {
                background: #f3c623;
                border: none;
                border-radius: 4px;
                padding: 3px 4px;
                font-weight: bold;
                font-size: 16px;
                box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
            }
            .text {
                margin-left: 10px;
            }
        }
        .budget-main {
            display: flex;
            justify-content: space-between;
            padding: 5px 25px;
            .pie {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                position: relative;
                background: #eaeaea;
                .remain {
                    text-align: center;
                    position: absolute;
                    top: 60%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                &::before {
                    content: "";
                    width: 64px;
                    height: 64px;
                    background: white;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    border-radius: 50%;
                }
            }
            .description {
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                .line {
                    width: 160px;
                    height: 1px;
                    background: #e3e3e3;
                    right: 0;
                }
                li {
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
`;
const Budget: React.FC = () => {
    return (
        <Wrapper className="budget">
            <div className="budget-header">
                <div className="text">07月总预算</div>
                <button className="setBudget">+设置预算</button>
            </div>
            <div className="budget-main">
                <div className="pie">
                    <div className="remain">
                        <span>剩余</span>
                        <span>0%</span>
                        </div>
                </div>
                <ul className="description">
                    <li>
                        <span className="budget-description">剩余预算</span>
                        <span className="number">0</span>
                    </li>
                    <li className="line"/>
                    <li>
                        <span className="budget-description">本月预算</span>
                        <span className="number">0</span>
                    </li>
                    <li>
                        <span className="budget-description">本月支出</span>
                        <span className="number">0</span>
                    </li>
                </ul>
            </div>
        </Wrapper>
    );
};
export {Budget};