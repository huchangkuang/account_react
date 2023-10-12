import Layout from "../components/Layout";
import React, { useEffect, useMemo, useState } from "react";
import { DataFilter } from "@/components/DataFilter";
import styled from "styled-components";
import dayjs from "dayjs";
import cs from "classnames";
import { NoData } from "@/components/NoData";
import { billList } from "@/api/bills";
import {
  BillFilterDate,
  BillItem,
  BillListQuery,
  BillType,
} from "@/api/bills/type";
import { tagList } from "@/api/tags";
import { TagItem } from "@/api/tags/type";
import { errorToast } from "@/utils/errorToast";
import { LocalStore } from "@/utils/localStore";

const Wrapper = styled.div`
  .bill-list {
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
          padding-top: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #b5b5b5;
          margin-bottom: 8px;
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
              .boat-icon {
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
  .noData {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
type DisplayBillItem = {
  date: string;
  total: number;
  list: BillItem[];
};
const Bill = () => {
  const [list, setList] = useState<BillItem[]>([]);
  const [tags, setTags] = useState<TagItem[]>([]);
  const [type, setType] = useState<BillType>(BillType.paid);
  const [date, setDate] = useState<BillFilterDate>("day");
  const formatTime = (d: BillFilterDate, time: string) => {
    const obj = {
      day: dayjs(time).format("YYYY-MM-DD"),
      month: dayjs(time).format("YYYY-MM"),
      year: dayjs(time).format("YYYY"),
    };
    return obj[d];
  };
  const displayList = useMemo<DisplayBillItem[]>(
    () =>
      list.reduce((arr: DisplayBillItem[], i) => {
        const curDate = formatTime(date, i.date);
        const item = arr.find((j) => j.date === curDate);
        if (item) {
          item.list.push(i);
          return arr.map((k) => ({
            ...k,
            total: k.list.reduce((sum, l) => sum + l.cash, 0),
          }));
        } else {
          return [...arr, { date: curDate, total: i.cash, list: [i] }];
        }
      }, []),
    [list, date],
  );
  const billTypeMap = {
    1: {
      color: "green",
      tag: "-",
    },
    2: {
      tag: "+",
      color: "red",
    },
  };
  const fetchBillList = async (newParam?: BillListQuery) => {
    if (!LocalStore.getToken()) {
      return;
    }
    try {
      const { data } = await billList({
        date: newParam?.date ?? date,
        type: newParam?.type ?? type,
      });
      setList(data);
    } catch (e) {
      errorToast(e);
    }
  };
  const fetchTagList = async () => {
    if (!LocalStore.getToken()) {
      return;
    }
    try {
      const { data } = await tagList();
      setTags(data);
    } catch (e) {
      errorToast(e);
    }
  };
  useEffect(() => {
    fetchBillList();
    fetchTagList();
  }, []);
  return (
    <Layout>
      <DataFilter
        getType={(type) => {
          setType(type);
          fetchBillList({ type });
        }}
        getDate={(date) => {
          setDate(date);
          fetchBillList({ date });
        }}
      />
      <Wrapper>
        {displayList.length !== 0 ? (
          <div className="bill-list">
            <ol>
              {displayList.map((i) => (
                <li key={i.date}>
                  <div className="head">
                    <div className="title">{i.date}</div>
                    <div className="sum">总计：{i.total}</div>
                  </div>
                  <ol>
                    {i.list.map((j, index) => {
                      const t = tags.filter((i) => j.tags.includes(i.id));
                      return (
                        <li key={index}>
                          <div className="detail">
                            <div className="classify">
                              {t.map((icon) => icon.name).join(",")}
                            </div>
                            <div className="note">{j.remark}</div>
                          </div>
                          <div
                            className={cs("count", billTypeMap[j.type].color)}
                          >
                            {billTypeMap[j.type].tag}
                            {j.cash}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <NoData />
        )}
      </Wrapper>
    </Layout>
  );
};
export default Bill;
