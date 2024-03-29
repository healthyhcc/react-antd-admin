import React, { useState, useEffect } from "react";
import * as Echarts from "echarts";
import cityMap from "./citymap";
import CHINA_JSON from "./map/china.json";

const provinces = {
  台湾: "taiwan",
  河北: "hebei",
  山西: "shanxi",
  辽宁: "liaoning",
  吉林: "jilin",
  黑龙江: "heilongjiang",
  江苏: "jiangsu",
  浙江: "zhejiang",
  安徽: "anhui",
  福建: "fujian",
  江西: "jiangxi",
  山东: "shandong",
  河南: "henan",
  湖北: "hubei",
  湖南: "hunan",
  广东: "guangdong",
  海南: "hainan",
  四川: "sichuan",
  贵州: "guizhou",
  云南: "yunnan",
  陕西: "shanxi1",
  甘肃: "gansu",
  青海: "qinghai",
  新疆: "xinjiang",
  广西: "guangxi",
  内蒙古: "neimenggu",
  宁夏: "ningxia",
  西藏: "xizang",
  北京: "beijing",
  天津: "tianjin",
  上海: "shanghai",
  重庆: "chongqing",
  香港: "xianggang",
  澳门: "aomen",
};
//直辖市和特别行政区-只有二级地图，没有三级地图
const special = ["北京", "天津", "上海", "重庆", "香港", "澳门"];

const China: React.FC = () => {
  let chart: any;
  const [mapData, setMapData] = useState<any>([]);

  const option: any = {
    backgroundColor: "#000",
    title: {
      text: "全国地图",
      subtext: "三级下钻",
      link: "https://github.com/healthyhcc",
      left: "center",
      textStyle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "normal",
        fontFamily: "Microsoft YaHei",
      },
      subtextStyle: {
        color: "#ccc",
        fontSize: 13,
        fontWeight: "normal",
        fontFamily: "Microsoft YaHei",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}",
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
      top: "center",
      feature: {
        saveAsImage: {},
      },
      iconStyle: {
        normal: {
          color: "#fff",
        },
      },
    },
    animationDuration: 1000,
    animationEasing: "cubicOut",
    animationDurationUpdate: 1000,
  };
  const handleInitChart = () => {
    const chartDOM: any = document.getElementById("chartMap");
    chart = Echarts.init(chartDOM);
  };
  const handleRenderMap = (map: any, data: any) => {
    option.title.subtext = map;
    option.series = [
      {
        name: map,
        type: "map",
        mapType: map,
        roam: false,
        nameMap: {
          china: "中国",
        },
        label: {
          normal: {
            show: true,
            textStyle: {
              color: "#999",
              fontSize: 13,
            },
          },
          emphasis: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 13,
            },
          },
        },
        itemStyle: {
          normal: {
            areaColor: "#323c48",
            borderColor: "dodgerblue",
          },
          emphasis: {
            areaColor: "darkorange",
          },
        },
        data,
      },
    ];
    //渲染地图
    chart.setOption(option);
  };
  const handleDrawChinaMap = () => {
    const areaData: any = [];
    const features = CHINA_JSON?.features;

    features.forEach((feature) => {
      areaData.push({ name: feature?.properties?.name });
    });

    setMapData(areaData);
    Echarts.registerMap("china", CHINA_JSON);
    handleRenderMap("china", areaData);
  };
  const handleClickMapEvent = () => {
    chart.on("click", (params: any) => {
      const { name, seriesName } = params;
      if (name in provinces) {
        //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
        const moduleData = import(`./map/province/${provinces[name]}.json`);
        moduleData.then((result) => {
          Echarts.registerMap(name, result?.default);

          const areaData: Array<object> = [];
          const features = result?.default?.features;

          features.forEach((feature: any) => {
            areaData.push({ name: feature?.properties?.name });
          });

          handleRenderMap(name, areaData);
        });
      } else if (seriesName in provinces) {
        //如果是【直辖市/特别行政区】只有二级下钻
        if (special.indexOf(seriesName) >= 0) {
          handleRenderMap("china", mapData);
        } else {
          //显示县级地图
          const moduleData = import(`./map/city/${cityMap[name]}.json`);

          moduleData.then((result) => {
            Echarts.registerMap(name, result?.default);

            const areaData: Array<object> = [];
            const features = result?.default?.features;

            features.forEach((feature: any) => {
              areaData.push({ name: feature?.properties?.name });
            });

            handleRenderMap(name, areaData);
          });
        }
      } else {
        handleRenderMap("china", mapData);
      }
    });
  };

  useEffect(() => {
    if (document.getElementById("chartMap")) {
      handleInitChart();
      handleDrawChinaMap();
      handleClickMapEvent();
    }
  }, []);

  return (
    <div
      id="chartMap"
      style={{ width: "100%", height: "calc(100vh - 100px - 2rem)" }}
    />
  );
};

export default China;
