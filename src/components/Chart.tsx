import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { ECharts } from "echarts";

type Props = {
  option: any;
};
const Chart: React.FC<Props> = (props) => {
  const container = useRef<HTMLDivElement | null>(null);
  const chart = useRef<ECharts | null>(null);
  const { option } = props;
  useEffect(() => {
    const width = document.documentElement.clientWidth;
    container.current!.style.width = `${width * 0.9}px`;
    container.current!.style.height = `${width * 0.6}px`;
    // @ts-ignore
    chart.current = echarts.init(container.current);
  }, []);
  useEffect(() => {
    chart.current!.setOption(option);
  }, [option]);
  return <div ref={container} />;
};
export { Chart };
