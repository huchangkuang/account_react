import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Prompt } from "@/components/Prompt";
import { useUpdate } from "@/hooks/useUpdate";
import dayjs from "dayjs";
import { Card } from "@/components/Card";
import { editBudget } from "@/api/user";
import { Button } from "boat-ui-react";
import { globalStyle } from "@/utils/style";
import { LocalStore } from "@/utils/localStore";
import { useNavigate } from "react-router-dom";

type BudgetProps = {
  expense: number;
  _budget: number;
};
const Budget: React.FC<BudgetProps> = ({ expense, _budget }) => {
  const navigate = useNavigate();
  const [month, setMonth] = useState("");
  const [display, setDisplay] = useState<string>("hide");
  const [budget, setBudget] = useState<number>(_budget);
  const [remain, setRemain] = useState<number>(0);
  const [deg, setDeg] = useState<number>(0);
  useUpdate(() => {
    let _remain = budget - expense;
    setRemain(_remain < 0 ? 0 : _remain);

    let x = (remain / budget) * 100;
    setDeg(Math.round(x ? x : 0));
  }, [budget, expense]);
  const changeBudget = async (state: string) => {
    if (!LocalStore.getToken()) {
      navigate("/login");
      return;
    }
    const number = parseFloat(state);
    if (number) {
      await editBudget(number);
      setBudget(number);
    } else {
      window.alert("请输入合法的数字");
    }
  };
  useEffect(() => {
    setBudget(_budget);
  }, [_budget]);

  useEffect(() => {
    setMonth(dayjs().format("MM"));
  }, []);
  return (
    <Wrapper deg={deg}>
      <Card className="budget">
        <div className="budget-header">
          <div className="text">{month}月总预算</div>
          <Button type="primary" onClick={() => setDisplay("show")}>
            +设置预算
          </Button>
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
            <li className="line" />
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
        <Prompt
          placeholder="请输入预算金额"
          show={display}
          onChange={(state) => setDisplay(state)}
          getValue={changeBudget}
          children="每月总预算"
        />
      </Card>
    </Wrapper>
  );
};
type Props = { deg: number };
const Wrapper = styled.div<Props>`
  .budget {
    min-height: 160px;
    .budget-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      .text {
        margin-left: 10px;
      }
    }
    .budget-main {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      @media (max-width: 352px) {
        padding: 5px 10px;
      }
      .pie {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        position: relative;
        background: conic-gradient(
          ${globalStyle.theme_color} ${(props) => (props.deg / 100) * 360}deg,
          #eaeaea ${(props) => (props.deg / 100) * 360}deg 360deg
        );
        .remain {
          text-align: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
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
  }
`;
export { Budget };
