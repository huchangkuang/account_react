import React, { useState } from "react";
import styled from "styled-components";
import { BillFilterDate, BillType } from "../api/bills/type";
import { globalStyle } from "@/utils/style";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  background: ${globalStyle.theme_color};
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
  padding: 12px 0;
  width: 100%;
  > ul {
    display: flex;
    justify-content: center;
    align-items: center;
    > li {
      border: 1px solid #333333;
      font-size: 16px;
      text-align: center;
      color: #333333;
      border-radius: 4px;
      margin: 0 2px;
      &.selected {
        background: #333333;
        color: ${globalStyle.theme_color};
      }
    }
  }
  .in-out {
    width: 40%;
    > li {
      padding: 4px 10px;
    }
  }
  .date {
    width: 50%;
    > li {
      padding: 4px 18px;
    }
  }
`;

const typeMap = { 1: "支出", 2: "收入" };
const dateMap = { day: "日", month: "月", year: "年" };
type Props = {
  getType: (type: BillType) => void;
  getDate: (date: BillFilterDate) => void;
};
const DataFilter: React.FC<Props> = (props) => {
  const [typeList] = useState<BillType[]>([BillType.paid, BillType.receive]);
  const [dateList] = useState<BillFilterDate[]>(["day", "month", "year"]);
  const [selectedType, setSelectedType] = useState<BillType>(BillType.paid);
  const [selectedDate, setSelectedDate] = useState<BillFilterDate>("day");
  const changeType = (i: BillType) => {
    setSelectedType(i);
    props.getType(i);
  };
  const changeDate = (d: BillFilterDate) => {
    setSelectedDate(d);
    props.getDate(d);
  };
  return (
    <Wrapper>
      <ul className="in-out">
        {typeList.map((i) => (
          <li
            key={i}
            className={selectedType === i ? "selected" : ""}
            onClick={() => changeType(i)}
          >
            {typeMap[i]}
          </li>
        ))}
      </ul>
      <ul className="date">
        {dateList.map((d) => (
          <li
            key={d}
            className={selectedDate === d ? "selected" : ""}
            onClick={() => changeDate(d)}
          >
            {dateMap[d]}
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};
export { DataFilter };
