import React from "react";
import { useSelector } from "react-redux";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
import en from "@/lang/en.json";
import zh from "@/lang/zh.json";

const IntlTheme: React.FC<any> = (props: any) => {
  const state: any = useSelector((state) => state);
  const { settings } = state;
  const localLang = settings["intl"];
  const i18nData: any = { en, zh };
  const languageMap: any = {
    en: enUS,
    zh: zhCN,
  };
  const theme = { token: { colorPrimary: settings.themeColor } };
  return (
    <IntlProvider
      key={localLang}
      locale={localLang}
      messages={i18nData[localLang]}
    >
      <ConfigProvider locale={languageMap[localLang]} theme={theme}>
        {props?.children}
      </ConfigProvider>
    </IntlProvider>
  );
};

export default IntlTheme;
