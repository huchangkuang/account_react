import Layout from "../components/Layout";
import React from "react";
import {DataFilter} from "../components/DataFilter";
import {useRecord} from "../hooks/useRecord";
import styled from "styled-components";
import {useTags} from "../hooks/useTags";
import Icon from "../components/Icon";

type Category = "-" | "+"
type ReceiptData = {
  amount: string, date: string, selectedId: number, note: string, type: Category
}
const BillList = styled.div`
  padding: 10px 20px;
  font-size: 18px;
  overflow: auto;
  .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2px 0;

      .title {
          border-radius: 4px;
          background: rgba(78, 78, 78, 0.1);
          padding: 4px 8px;
      }
  }
  li {
      margin-bottom: 10px;
      > ol {
          > li {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px solid #b5b5b5;
              margin-bottom: 2px;
              .count {
                  &.red {
                      color: #d40606;
                  }
                  &.green {
                      color: #0d930d;
                  }
              }
              .detail {
                max-width: 80%;
                .classify {
                  padding: 4px 0;
                  .icon {
                    width: 1em;
                    height: 1em;
                  }
                }
                .note {
                    font-size: 16px;
                    word-wrap: break-word;
                    color: #b5b5b5;
                }
              }
          }
      }
  }
`;
const Bill = () => {
  const {recordItem} = useRecord();
  const {tags} = useTags();
  const getGroupRecord = () => {
    if (recordItem.length === 0) {return [];}
    const newRecord: ReceiptData[] = JSON.parse(JSON.stringify(recordItem));
    const result = [{title: newRecord[0].date, item: [newRecord[0]], total: 0}];
    const titleList: string[] = [];
    for (let i = 1; i < newRecord.length; i++) {
      let current = newRecord[i];
      for (let j = 0; j < result.length; j++) {
        if (titleList.indexOf(result[j].title)) {
          titleList.push(result[j].title);
        }
      }
      let index = titleList.indexOf(current.date);
      if (index >= 0) {
        result.map(i => i.title === titleList[index] ? i.item.push(current) : i);
      } else {
        result.push({title: current.date, item: [current], total: 0});
      }
    }
    return result;
  };
  return (
    <Layout>
      <DataFilter/>
      <BillList>
        <ol>
          {getGroupRecord().map(i => <li key={i.title}>
            <div className="head">
              <div className="title">{i.title}</div>
              <div className="sum">总计：{i.total}</div>
            </div>
            <ol>
              {i.item.map((j, index) => <li key={index}>
                <div className="detail">
                  <div className="classify">
                    <Icon name={tags.filter(i => i.id === j.selectedId)[0].name}/>
                    {tags.filter(i => i.id === j.selectedId)[0].text}
                  </div>
                  <div className="note">{j.note}</div>
                </div>
                <div className="count">
                  {j.type + j.amount}
                </div>
              </li>)}
            </ol>
          </li>)}
        </ol>
      </BillList>
    </Layout>
  );
};
export default Bill;
