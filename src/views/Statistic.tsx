import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { DataFilter } from "@/components/DataFilter";
import { NoData } from "@/components/NoData";
import { Chart } from "@/components/Chart";
import styled from "styled-components";
import dayjs from "dayjs";
import {
  BillFilterDate,
  BillItem,
  BillListQuery,
  BillType,
} from "@/api/bills/type";
import { billList } from "@/api/bills";
import { tagList } from "@/api/tags";
import { TagItem } from "@/api/tags/type";
import { errorToast } from "@/utils/errorToast";
import { LocalStore } from "@/utils/localStore";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .chart {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    overflow: auto;
    .nodata {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
    .line {
      flex-grow: 1;
      border-bottom: 1px solid #b5b5b5;
      padding: 10px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
    .pie {
      flex-grow: 1;
      padding: 10px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
  }
`;
const Statistic = () => {
  const [type, setType] = useState<BillType>(BillType.paid);
  const [date, setDate] = useState<BillFilterDate>("day");
  const [list, setList] = useState<BillItem[]>([]);
  const nMap = { day: 30, month: 12, year: 5 };
  const [tags, setTags] = useState<TagItem[]>([]);
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
  const getGroupRecord = (type: BillType, date: BillFilterDate) => {
    type DataOrigin = {
      lineX: string[];
      lineY: number[];
      pieValue: { value: number; name: string }[];
      pieName: string[];
    };
    const dataOrigin: DataOrigin = {
      lineX: [],
      lineY: [],
      pieValue: [],
      pieName: [],
    };
    const { lineX, lineY, pieValue, pieName } = dataOrigin;
    for (let i = 0; i < list.length; i++) {
      const current = list[i];
      if (lineX.indexOf(formatTime(date, current.date)) < 0) {
        lineX.push(formatTime(date, current.date)); //"MM-DD"
      }
      const t = tags
        .filter((i) => current.tags.includes(i.id))
        .map((t) => t.name);
      const pieT = t.filter((l) => !pieName.includes(l));
      pieName.push(...pieT);
    }
    lineX.sort((a, b) => dayjs(a).valueOf() - dayjs(b).valueOf());
    const maxDate = lineX[lineX.length - 1];
    lineX.splice(0, lineX.length);
    fillDate(maxDate, nMap[date], lineX, date);
    lineX.sort((a, b) => dayjs(a).valueOf() - dayjs(b).valueOf());

    for (let i = 0; i < lineX.length; i++) {
      const current = lineX[i];
      lineY.push(
        list.reduce(
          (sum, i) =>
            formatTime(date, i.date) === formatTime(date, current)
              ? sum + i.cash
              : sum,
          0,
        ),
      );
    }
    for (let i = 0; i < pieName.length; i++) {
      const current = pieName[i];
      pieValue.push({
        value: list.reduce((sum, i) => {
          const t = tags
            .filter((n) => i.tags.includes(n.id))
            .map((t) => t.name);
          return t.includes(current) ? sum + i.cash : sum;
        }, 0),
        name: current,
      });
    }
    return dataOrigin;
  };
  const fillDate = (
    maxDate: string,
    n: number,
    arr: string[],
    date: BillFilterDate,
  ) => {
    const map = {
      day: "MM-DD",
      month: "MM",
      year: "YYYY",
    };
    const template = map[date];
    if (n > 0) {
      arr.push(maxDate);
      maxDate = dayjs(maxDate).subtract(1, date).format(template);
      n -= 1;
      fillDate(maxDate, n, arr, date);
    } else {
      return arr;
    }
  };
  const formatTime = (d: BillFilterDate, time: string) => {
    const obj = {
      day: dayjs(time).format("MM-DD"),
      month: dayjs(time).format("MM"),
      year: dayjs(time).format("YYYY"),
    };
    return obj[d];
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
  const { lineX, lineY, pieName, pieValue } = getGroupRecord(type, date);
  const optionLine = {
    title: {
      text: "金额统计",
      left: "center",
    },
    xAxis: {
      type: "category",
      data: lineX,
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        margin: 4,
        length: 3,
      },
    },
    tooltip: {
      triggerOn: "click",
      formatter: "日期：{b}；金额：{c}",
    },
    series: [
      {
        data: lineY,
        type: "line",
        markPoint: {
          data: [
            {
              type: "max",
            },
          ],
        },
      },
    ],
  };
  const optionPie = {
    title: {
      text: "分类占比(总)",
      subtext: "",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: pieName,
    },
    series: [
      {
        name: "支出",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: pieValue,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          formatter: "{b}\n{d}%",
        },
      },
    ],
  };
  useEffect(() => {
    fetchBillList();
    fetchTagList();
  }, []);
  return (
    <Layout>
      <Wrapper>
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
        <div className="chart">
          <div className="line">
            {list.length === 0 ? (
              <div className="nodata">
                <div style={{ marginBottom: 20 }}>支出统计</div>
                <NoData />
              </div>
            ) : (
              <Chart option={optionLine} />
            )}
          </div>
          <div className="pie">
            {list.length === 0 ? (
              <div className="nodata">
                <div style={{ marginBottom: 20 }}>分类占比</div>
                <NoData />
              </div>
            ) : (
              <Chart option={optionPie} />
            )}
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};
export default Statistic;
