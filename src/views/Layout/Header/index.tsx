import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { MenuProps } from 'antd';
import {
  Layout,
  Dropdown,
  Space,
  Avatar,
  Button,
  Tooltip,
  message,
} from "antd";
import {
  DownOutlined,
  SettingOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import { useIntl } from "react-intl";
import FullScreen from "@/components/FullScreen";
import DrawerSettings from "@/components/DrawerSettings";
import Hamburger from "@/components/Hamburger";
import BreadCrumb from "@/components/BreadCrumb";
import { setIntl } from "@/store";
import { SERVER_ADDRESS } from "@/utils/config";

const Header: React.FC = () => {
  const state: any = useSelector((state) => state);
  const settingsDispatch = useDispatch();
  const { user, settings } = state;
  const { userInfo } = user;
  const { collapsed, fixedHeader } = settings;
  const [drawerOpen, setDrawerOpen] = useState<any>(false);
  const isMb = document.body.clientWidth <= 992;
  const [mobile, setMobile] = useState(isMb);
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const handleIntl = (event: any) => {
    const setIntlAction = setIntl(event.key);
    settingsDispatch(setIntlAction);
  };
  const handleLogout = () => {
    localStorage.clear();
    message.success(formatMessage("header.logout_success"));
  };
  const intlMenu: MenuProps['items'] = [
    { key: "en", label: "English" },
    { key: "zh", label: "中文" },
  ]
  const systemMenu: MenuProps['items'] = [
    {
      key: "1",
      label: (
        <a href="#/setting-menu/user-setting/basic-info">
          {formatMessage("header.system_menu.basic_info")}
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a href="#/setting-menu/user-setting/modify-password">
          {formatMessage("header.system_menu.modify_password")}
        </a>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <a href="/" onClick={() => handleLogout()}>
          {formatMessage("header.system_menu.logout")}
        </a>
      ),
    },
  ]
  const computedStyle = () => {
    let styles;
    if (fixedHeader) {
      if (collapsed) {
        styles = {
          width: "calc(100% - 80px)",
        };
      } else {
        styles = {
          width: "calc(100% - 200px)",
        };
      }
    } else {
      styles = {
        width: "100%",
      };
    }
    return styles;
  };
  const handleResizeEvent = () => {
    const addResizeEvent = () => {
      const isMb = document.body.clientWidth <= 992;
      setMobile(isMb);
    };
    window.addEventListener("resize", addResizeEvent);
  };
  useEffect(() => {
    handleResizeEvent();
  }, []);
  return (
    <>
      {fixedHeader ? <Layout.Header /> : null}
      <Layout.Header
        style={{
          ...computedStyle(),
          transition: "width 0.2s",
          zIndex: 9,
          height: 64,
          backgroundColor: "#fff",
          boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
        }}
        className={fixedHeader ? "fixed top-0 right-0" : ""}
      >
        <div className="flex justify-between w-full">
          <div className="flex justify-start items-center">
            {mobile ? null : <Hamburger />}
            {mobile ? null : <BreadCrumb />}
          </div>
          <div className={"h-16 flex justify-end items-center mr-12"}>
            <div className="h-full flex justify-between items-center text-2xl">
              <FullScreen />

              <div id="intl">
                <Dropdown menu={{ items: intlMenu, onClick: handleIntl }} placement="bottom" arrow>
                  <a onClick={(event: any) => event?.preventDefault()}>
                    <Space>
                      <TranslationOutlined className="ml-4" />
                    </Space>
                  </a>
                </Dropdown>
              </div>

              <div id="settings">
                <Tooltip
                  placement="bottom"
                  title={formatMessage("header.system_settings")}
                >
                  <SettingOutlined
                    className="mx-4 cursor-default"
                    onClick={() => setDrawerOpen(true)}
                  />
                </Tooltip>
              </div>
            </div>
            <div className="h-full flex justify-between items-center">
              <Avatar src={`${SERVER_ADDRESS}/${userInfo?.avatar}`} />
              <Dropdown menu={{ items: systemMenu }} placement="bottom" arrow>
                <Button type="link">
                  <span className="text-lg">{userInfo?.username}</span>
                  <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </div>
          <DrawerSettings
            drawerOpen={drawerOpen}
            fixedHeader={fixedHeader}
            setDrawerOpen={setDrawerOpen}
          />
        </div>
      </Layout.Header>
    </>
  );
};

export default Header;
