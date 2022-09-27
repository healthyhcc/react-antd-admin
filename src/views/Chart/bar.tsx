import React from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import ReactECharts from "echarts-for-react";

const Bar: React.FC = () => {
  const state: any = useSelector((state) => state);
  const { settings } = state;
  const settingsIntl = settings.intl;
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const chartOptionsData = {
    legend_data:
      settingsIntl === "zh"
        ? ["蒸发量", "降水量"]
        : ["Evaporation", "Precipitation"],
    xAxis_data:
      settingsIntl === "zh"
        ? [
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
          ]
        : [
            "Jan.",
            "Feb.",
            "Mar.",
            "Apr.",
            "May",
            "Jun.",
            "Jul.",
            "Aug.",
            "Sept.",
            "Oct.",
            "Nov.",
            "Dec.",
          ],
  };
  const chartOptions = {
    backgroundColor: "#08263a",
    title: {
      top: 30,
      text: formatMessage("chart.bar_title"),
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
      data: chartOptionsData.legend_data,
      right: "2%",
      top: 20,
      textStyle: {
        fontWeight: "normal",
        fontSize: 16,
        color: "#fff",
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
        data: chartOptionsData.xAxis_data,
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#009688",
            width: 2,
          },
        },
        axisLabel: {
          color: "#fff",
          margin: 10,
          formatter: "{value} mm",
          textStyle: {
            fontSize: 14,
          },
        },
      },
    ],
    series: [
      {
        name: formatMessage("chart.bar_series_name1"),
        type: "bar",
        data: [
          8.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
        ],
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "Average" }],
        },
        itemStyle: {
          normal: {
            color: "#1890FF",
            label: {
              show: true,
              position: "top",
              formatter: "{c}",
            },
          },
        },
      },
      {
        name: formatMessage("chart.bar_series_name2"),
        type: "bar",
        data: [
          10.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
        ],
        markPoint: {
          data: [
            { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
            { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "Average" }],
        },
        itemStyle: {
          normal: {
            color: "#001529",
          },
        },
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

export default Bar;
