import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { setCollapse } from "@/store/store";

const Hamburger: React.FC = () => {
  const state: any = useSelector((state) => state);
  const settingsDispatch = useDispatch();
  const { settings } = state;
  const { collapsed } = settings;
  return (
    <div
      id="hamburger"
      className="h-full flex items-center cursor-pointer text-2xl -ml-8"
      onClick={() => settingsDispatch(setCollapse(!collapsed))}
    >
      {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
    </div>
  );
};

export default Hamburger;
