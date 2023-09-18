import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecord } from "../../hooks/useRecord";
import { useUpdate } from "../../hooks/useUpdate";
import dayjs from "dayjs";
import { Card } from "../../components/Card";

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
type RemainProps = {
  expense: number;
  income: number;
};
const Remain: React.FC<RemainProps> = ({ expense, income }) => {
  const [remain, setRemain] = useState(0);
  useUpdate(() => {
    setRemain(income - expense);
  }, [expense, income]);
  return (
    <Wrapper>
      <Card className="remain">
        <div className="time">
          <div className="year">{dayjs().format("YYYY")}年</div>
          <div className="mouth">{dayjs().format("MM")}月</div>
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
