import React from "react";
import styled from "styled-components";
import { CommonBill } from "@/api/bills/type";
import { TagItem } from "@/api/tags/type";

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
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    .amount {
      display: flex;
      justify-content: space-between;
      padding: 8px 10px;
      font-size: 24px;
      font-family: Consolas, monospace;
      border-bottom: 1px solid #e9e9e9;
      @media (max-height: 580px) {
        padding: 0 10px;
      }
    }
    .bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 10px;
      > :first-child {
        flex-shrink: 0;
      }
    }
    .notes {
      .note-content {
        max-width: 80%;
        overflow-wrap: break-word;
      }
    }
  }
`;

type Props = {
  receiptData: CommonBill;
  tags: TagItem[];
};
const Receipt: React.FC<Props> = ({ receiptData, tags }) => {
  const { tags: select = [], cash, date, remark } = receiptData;
  return (
    <Wrapper>
      <div className="top-bar">
        <div className="top-in" />
      </div>
      <div className="paper">
        <div className="amount">
          <div className="text">金额：</div>
          <div className="output">{cash}</div>
        </div>
        <div className="bar time">
          <div>日期：</div>
          <div className="time-content">{date}</div>
        </div>
        <div className="bar kind">
          <div>分类：</div>
          <div className="kind-content">
            {tags
              .filter((i) => select.includes(i.id))
              .map((i) => i.name)
              .join(",")}
          </div>
        </div>
        <div className="bar notes">
          <div>备注：</div>
          <div className="note-content">{remark}</div>
        </div>
      </div>
    </Wrapper>
  );
};
export { Receipt };
