import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Space } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { setCollapse } from "@/store";

const Hamburger: React.FC<any> = (props: any) => {
  const { hamburgerRef } = props;
  const state: any = useSelector((state) => state);
  const settingsDispatch = useDispatch();
  const { settings } = state;
  const { collapsed } = settings;
  const handleCollapse = () => {
    settingsDispatch(setCollapse(!collapsed));
  };
  return (
    <Space className="h-full flex items-center cursor-pointer text-2xl -ml-8">
      <span ref={hamburgerRef} onClick={handleCollapse}>
        {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </span>
    </Space>
  );
};

export default Hamburger;
