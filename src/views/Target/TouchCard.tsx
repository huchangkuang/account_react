import React from "react";
import styled from "styled-components";
import Icon from "../../components/Icon";
import dayjs from "dayjs";
import {reportCard} from "../../api/user";

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
type TouchCardProps = {
  billsNum: number;
  reportNum: number;
  reportDate: string;
  refresh?: () => void;
}
const TouchCard: React.FC<TouchCardProps> = ({reportDate, reportNum,billsNum,refresh}) => {
  const today = dayjs().format("YYYY-MM-DD");
  const touchCard = async () => {
    if (dayjs(reportDate).format("YYYY-MM-DD") === today) {
      window.alert("今日已经打过卡咯！");
    } else {
      try {
        await reportCard()
        refresh?.()
        window.alert("打卡成功，保持记账的好习惯哦！");
      } catch(e) {
        console.error(e);
      }
    }
  };
  return (
    <Wrapper>
      <div className="keeping">
        <div className="number">{reportNum}</div>
        <div>已持续打卡</div>
      </div>
      <div className="touch" onClick={touchCard}>
        <Icon name="touchCard" />
        <span>打卡</span>
      </div>
      <div className="sum">
        <div className="number">{billsNum}</div>
        <div>记账总天数</div>
      </div>
    </Wrapper>
  );
};
export { TouchCard };
