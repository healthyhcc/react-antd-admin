import React from "react";
import { useIntl } from "react-intl";
import * as Echarts from "echarts";
import ReactECharts from "echarts-for-react";

const Line: React.FC = () => {
  const intl = useIntl();
  const formatMessage = (id: string): string =>{
    return intl.formatMessage({ id });
  };
  const chartOptions = {
    color: ["#009688", "#1f9fff", "#5eb878"],
    backgroundColor: "#08263a",
    title: {
      top: 30,
      text: formatMessage("chart.line_title"),
      textStyle: {
        fontWeight: "normal",
        fontSize: 16,
        color: "#1DA57A",
      },
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      padding: [5, 10],
    },
    legend: {
      top: 20,
      icon: "rect",
      itemWidth: 14,
      itemHeight: 5,
      itemGap: 13,
      right: "2%",
      textStyle: {
        fontSize: 12,
        color: "#57617B",
      },
    },
    grid: {
      top: 80,
      left: "3%",
      right: "3%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category", 
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#009688",
            width: 2,
          },
        },
        axisLabel: {
          color: "#fff",
        },
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
      },
    ],
    yAxis: [
      {
        type: "value",
        name: formatMessage("chart.line_yAxis_name"),
        min: 0,
        max: 1500,
        position: "left",
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#009688",
            width: 2,
          },
        },
        axisLabel: {
          color: "#fff",
          margin: 10,
          textStyle: {
            fontSize: 14,
          },
        },
      },
    ],
    series: [
      {
        name: "A1",
        type: "line",
        position: "left",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 1,
          },
        },
        areaStyle: {
          normal: {
            color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(137, 189, 27, 0.3)",
              },
              {
                offset: 0.8,
                color: "rgba(137, 189, 27, 0)",
              },
            ]),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10,
          },
        },
        itemStyle: {
          normal: {
            color: "rgb(137,189,27)",
            borderColor: "rgba(137,189,2,0.27)",
            borderWidth: 12,
          },
        },
        data: [
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
        ],
      },
      {
        name: "A2",
        type: "line",
        position: "right",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 1,
          },
        },
        areaStyle: {
          normal: {
            color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(0, 136, 212, 0.3)",
              },
              {
                offset: 0.8,
                color: "rgba(0, 136, 212, 0)",
              },
            ]),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10,
          },
        },
        itemStyle: {
          normal: {
            color: "rgb(0,136,212)",
            borderColor: "rgba(0,136,212,0.2)",
            borderWidth: 12,
          },
        },
        data: [
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
        ],
      },
      {
        name: "A3",
        type: "line",
        position: "center",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 1,
          },
        },
        areaStyle: {
          normal: {
            color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(219, 50, 51, 0.3)",
              },
              {
                offset: 0.8,
                color: "rgba(219, 50, 51, 0)",
              },
            ]),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10,
          },
        },
        itemStyle: {
          normal: {
            color: "rgb(219,50,51)",
            borderColor: "rgba(219,50,51,0.2)",
            borderWidth: 12,
          },
        },
        data: [
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
          Math.floor(Math.random() * 1000),
        ],
      },
    ],
  };
  return (
    <ReactECharts
      option={chartOptions}
      style={{ width: "100%", height: "calc(100vh - 100px - 2rem)" }}
    />
  );
};

export default Line;
