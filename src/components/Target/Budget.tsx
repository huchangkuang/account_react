import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Prompt} from "../Prompt";
import {useUpdate} from "../../hooks/useUpdate";
import {useRecord} from "../../hooks/useRecord";
import dayjs from "dayjs";

const Budget: React.FC = () => {
  const now = dayjs()
  const [month,setMonth] = useState("")
  const [expense, setExpense] = useState<number>(0);
  const [display, setDisplay] = useState<string>("hide");
  const [budget, _setBudget] = useState<number>(0);
  const [remain, setRemain] = useState<number>(0);
  const [deg,setDeg] = useState<number>(0)
  const {recordItem} = useRecord();
  useEffect(()=>{
    setMonth(now.format("MM"))
  },[now])
  useUpdate(() => {
    let _remain = budget - expense;
    setRemain(_remain < 0 ? 0 : _remain);
    setExpense(recordItem.filter(i => i.type === "-").reduce((sum, j) =>  sum + parseFloat(j.amount), 0));
    let x = remain/budget*100
    setDeg(Math.round(x ? x : 0 ))
  }, [budget, expense, recordItem]);
  const setBudget = (state: string) => {
    const number = parseFloat(state);
    if (number) {
      _setBudget(number);
      window.localStorage.setItem("budget", state);
    } else {
      window.alert("请输入合法的数字");
    }
  };
  return (
    <Wrapper deg={deg} className="budget">
      <div className="budget-header">
        <div className="text">{month}月总预算</div>
        <button className="setBudget" onClick={() => setDisplay("show")}>+设置预算</button>
      </div>
      <div className="budget-main">
        <div className="pie">
          <div className="remain">
            <span>剩余</span>
            <span>{deg}%</span>
          </div>
        </div>
        <ul className="description">
          <li>
            <span className="budget-description">剩余预算</span>
            <span className="number">{remain}</span>
          </li>
          <li className="line"/>
          <li>
            <span className="budget-description">本月预算</span>
            <span className="number">{budget}</span>
          </li>
          <li>
            <span className="budget-description">本月支出</span>
            <span className="number">{expense}</span>
          </li>
        </ul>
      </div>
      <Prompt placeholder="请输入预算金额" show={display} onChange={state => setDisplay(state)}
              getValue={setBudget} children="每月总预算"/>
    </Wrapper>
  );
};
type Props = {deg:number}
const Wrapper = styled.div<Props>`
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
            @media(max-width: 352px){
              padding: 5px 10px;
            }
            .pie {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                position: relative;
                background: conic-gradient(#f3c623 ${props => props.deg/100*360}deg,#eaeaea ${props=>props.deg/100*360}deg 360deg);
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
export {Budget};
