import Layout from "../components/Layout";
import React, {useState} from "react";
import {DataFilter} from "../components/DataFilter";
import {useRecord} from "../hooks/useRecord";
import styled from "styled-components";
import {useTags} from "../hooks/useTags";
import Icon from "../components/Icon";
import dayjs from "dayjs";
import cs from "classnames";
import {NoData} from "../components/NoData";


const Wrapper = styled.div`
  .bill-list{
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
                  display: flex;
                  align-items: center;
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
  }
  .noData{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
`;
type Category = "-" | "+"
type ReceiptData = {
  amount: string, date: string, selectedId: number, note: string, type: Category
}
const Bill = () => {
  const {recordItem} = useRecord();
  const {tags} = useTags();
  const [type, setType] = useState<"-" | "+">("-");
  const [date, setDate] = useState<"day" | "month" | "year">("day");
  const colorType = type === "+" ? "red" : "green";
  const formatTime=(type: "day"|"month"|"year",time: string)=>{
    const obj = {
      "day":dayjs(time).format("YYYY-MM-DD"),
      "month":dayjs(time).format("YYYY-MM"),
      "year":dayjs(time).format("YYYY")
    }
    return obj[type]
  }
  const getGroupRecord = () => {
    if (recordItem.length === 0) {return [];}
    const newRecord: ReceiptData[] = (JSON.parse(JSON.stringify(recordItem)) as ReceiptData[]).filter(i => i.type === type);
    const result = [{title: formatTime(date,newRecord[0].date), item: [newRecord[0]], total: 0}];
    const titleList: string[] = [];
    for (let i = 1; i < newRecord.length; i++) {
      let current = newRecord[i];
      for (let j = 0; j < result.length; j++) {
        if (titleList.indexOf(result[j].title)) {
          titleList.push(result[j].title);
        }
      }
      let index = titleList.indexOf(formatTime(date,current.date));
      if (index >= 0) {
        result[index].item.push(current)
      } else {
        result.push({title: formatTime(date,current.date), item: [current], total: 0});
      }
    }
    result.sort((a, b) => dayjs(b.title).valueOf() - dayjs(a.title).valueOf());
    result.map(i => i.total = i.item.reduce((sum, j) => sum+parseFloat(j.amount), 0));
    return result;
  };
  return (
    <Layout>
      <DataFilter getType={type => setType(type)} getDate={date => setDate(date)}/>
      <Wrapper>
        {recordItem.length !== 0 ?
          <div className="bill-list">
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
                    <div className={cs("count", colorType)}>
                      {j.type + j.amount}
                    </div>
                  </li>)}
                </ol>
              </li>)}
            </ol>
          </div>
          : <NoData/>
        }
      </Wrapper>
    </Layout>
  );
};
export default Bill;
