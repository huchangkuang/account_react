import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Icon from "../../components/Icon";
import dayjs from "dayjs";
import { useRecord } from "../../hooks/useRecord";

const Wrapper = styled.div`
  background: #f3c623;
  border-radius: 0 0 16px 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 94px;
  font-weight: bold;
  .keeping,
  .sum {
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
`;
const TouchCard: React.FC = () => {
  const today = dayjs().format("YYYY-MM-DD");
  const [keep, setKeep] = useState<number>(0);
  const { recordItem } = useRecord();
  const [sumDay, setSumDay] = useState(0);
  useEffect(() => {
    setKeep(parseFloat(window.localStorage.getItem("keep") || "0"));
  }, []);
  useEffect(() => {
    // let dateArray = recordItem.reduce((arr: string[], i) => {
    //   if (arr.indexOf(i.date) < 0) {
    //     arr.push(i.date);
    //     return arr;
    //   } else {
    //     return arr;
    //   }
    // }, []);
    // setSumDay(dateArray.length);
  }, [recordItem]);
  const touchCard = () => {
    let lastTouch = window.localStorage.getItem("lastTouch");
    if (lastTouch === today) {
      window.alert("今日已经打过卡咯！");
    } else {
      window.alert("打卡成功，保持记账的好习惯哦！");
      setKeep(keep + 1);
      window.localStorage.setItem("keep", (keep + 1).toString());
      window.localStorage.setItem("lastTouch", today);
    }
  };
  return (
    <Wrapper>
      <div className="keeping">
        <div className="number">{keep}</div>
        <div>已持续打卡</div>
      </div>
      <div className="touch" onClick={touchCard}>
        <Icon name="touchCard" />
        <span>打卡</span>
      </div>
      <div className="sum">
        <div className="number">{sumDay}</div>
        <div>记账总天数</div>
      </div>
    </Wrapper>
  );
};
export { TouchCard };
