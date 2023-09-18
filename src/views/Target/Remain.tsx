import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecord } from "../../hooks/useRecord";
import { useUpdate } from "../../hooks/useUpdate";
import dayjs from "dayjs";
import {Card} from "../../components/Card";

const Wrapper = styled.div`
  .remain {
    min-height: 64px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-weight: bold;
    .time {
      text-align: center;
    }
    .line {
      width: 1px;
      background: #c4c4c4;
      height: 32px;
      margin-inline: 40px;
    }
    .message {
      flex-grow: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
`;
const Remain: React.FC = () => {
  const now = dayjs();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const { recordItem } = useRecord();
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [remain, setRemain] = useState(0);
  useEffect(() => {
    setMonth(now.format("MM"));
    setYear(now.format("YYYY"));
  }, [now]);
  useUpdate(() => {
    setExpense(
      recordItem
        .filter((i) => i.type === "-")
        .reduce((sum, j) => sum + parseFloat(j.amount), 0),
    );
    setIncome(
      recordItem
        .filter((i) => i.type === "+")
        .reduce((sum, j) => sum + parseFloat(j.amount), 0),
    );
    setRemain(income - expense);
  }, [expense, income, recordItem]);
  return (
    <Wrapper>
      <Card className="remain">
        <div className="time">
          <div className="year">{year}年</div>
          <div className="mouth">{month}月</div>
        </div>
        <div className="line" />
        <ul className="message">
          <li>
            <div className="description">收入</div>
            <div className="number">{income}</div>
          </li>
          <li>
            <div className="description">支出</div>
            <div className="number">{expense}</div>
          </li>
          <li>
            <div className="description">结余</div>
            <div className="number">{remain}</div>
          </li>
        </ul>
      </Card>
    </Wrapper>
  );
};
export { Remain };
