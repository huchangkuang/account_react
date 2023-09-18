import Layout from "../components/Layout";
import React, { useState } from "react";
import { DataFilter } from "../components/DataFilter";
import { NoData } from "../components/NoData";
import { Chart } from "../components/Chart";
import styled from "styled-components";
import { useRecord } from "../hooks/useRecord";
import dayjs from "dayjs";
import { useTags } from "../hooks/useTags";

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
type Category = "-" | "+";
type ReceiptData = {
  amount: string;
  date: string;
  selectedId: number;
  note: string;
  type: Category;
};
const Statistic = () => {
  const [type, setType] = useState<"-" | "+">("-");
  const [date, setDate] = useState<"day" | "month" | "year">("day");
  const { recordItem } = useRecord();
  const { tags } = useTags();
  const nMap = { day: 30, month: 12, year: 5 };
  const getGroupRecord = (type: string, date: "day" | "month" | "year") => {
    type DataOrigin = {
      lineX: string[];
      lineY: number[];
      pieValue: { value: number; name: string }[];
      pieName: string[];
    };
    const newRecord = (
      JSON.parse(JSON.stringify(recordItem)) as ReceiptData[]
    ).filter((i) => i.type === type);
    const dataOrigin: DataOrigin = {
      lineX: [],
      lineY: [],
      pieValue: [],
      pieName: [],
    };
    const { lineX, lineY, pieValue, pieName } = dataOrigin;
    for (let i = 0; i < newRecord.length; i++) {
      const current = newRecord[i];
      if (lineX.indexOf(formatTime(date, current.date)) < 0) {
        lineX.push(formatTime(date, current.date)); //"MM-DD"
      }
      if (
        pieName.indexOf(
          tags.filter((i) => i.id === current.selectedId)[0].name,
        ) < 0
      ) {
        pieName.push(tags.filter((i) => i.id === current.selectedId)[0].name);
      }
    }
    //["06-15","07-07"]
    lineX.sort((a, b) => dayjs(a).valueOf() - dayjs(b).valueOf());
    const maxDate = lineX[lineX.length - 1];
    lineX.splice(0, lineX.length);
    fillDate(maxDate, nMap[date], lineX, date);
    lineX.sort((a, b) => dayjs(a).valueOf() - dayjs(b).valueOf());
    //["07-04","07-05","07-06","07-07"]

    for (let i = 0; i < lineX.length; i++) {
      const current = lineX[i];
      lineY.push(
        newRecord.reduce(
          (sum, i) =>
            formatTime(date, i.date) === formatTime(date, current)
              ? sum + parseFloat(i.amount)
              : sum,
          0,
        ),
      );
    }
    for (let i = 0; i < pieName.length; i++) {
      const current = pieName[i];
      pieValue.push({
        value: newRecord.reduce(
          (sum, i) =>
            tags.filter((j) => j.id === i.selectedId)[0].name === current
              ? sum + parseFloat(i.amount)
              : sum,
          0,
        ),
        name: current,
      });
    }
    return dataOrigin;
  };
  const fillDate = (
    maxDate: string,
    n: number,
    arr: string[],
    date: "day" | "month" | "year",
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
  const formatTime = (type: "day" | "month" | "year", time: string) => {
    const obj = {
      day: dayjs(time).format("MM-DD"),
      month: dayjs(time).format("MM"),
      year: dayjs(time).format("YYYY"),
    };
    return obj[type];
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
  return (
    <Layout>
      <Wrapper>
        <DataFilter
          getType={(type) => setType(type)}
          getDate={(date) => setDate(date)}
        />
        <div className="chart">
          <div className="line">
            {recordItem.length === 0 ? (
              <div className="nodata">
                <div>支出统计</div>
                <NoData />
              </div>
            ) : (
              <Chart option={optionLine} />
            )}
          </div>
          <div className="pie">
            {recordItem.length === 0 ? (
              <div className="nodata">
                <div>分类占比</div>
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
