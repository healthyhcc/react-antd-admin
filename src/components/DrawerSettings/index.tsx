import React from "react";
import { Drawer, Switch, Space, Button, Divider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import { setFixedHeader, setShowLogo, setShowTag } from "@/store";

const DrawerSettings: React.FC<any> = (props: any) => {
  const { drawerOpen, setDrawerOpen } = props;
  const state: any = useSelector((state) => state);
  const settingsDispatch = useDispatch();
  const { settings } = state;
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const handleFixedHeader = (checked: any) => {
    settingsDispatch(setFixedHeader(checked));
  };
  const handleShowLogo = (checked: any) => {
    settingsDispatch(setShowLogo(checked));
  };
  const handleShowTag = (checked: any) => {
    settingsDispatch(setShowTag(checked));
  };
  return (
    <Drawer
      title={formatMessage("drawsettings.title")}
      closeIcon={<></>}
      placement="right"
      open={drawerOpen}
      headerStyle={{ boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)" }}
      extra={
        <Space>
          <Button type="primary" onClick={() => setDrawerOpen(false)}>
            OK
          </Button>
        </Space>
      }
    >
      <div className="flex justify-between items-center">
        <span>{formatMessage("drawsettings.fixed_header")}</span>
        <Switch
          checkedChildren={formatMessage("drawsettings.open")}
          unCheckedChildren={formatMessage("drawsettings.close")}
          defaultChecked={settings?.fixedHeader}
          onChange={handleFixedHeader}
        />
      </div>
      <Divider dashed />

      <div className="flex justify-between items-center">
        <span>{formatMessage("drawsettings.show_logo")}</span>
        <Switch
          checkedChildren={formatMessage("drawsettings.open")}
          unCheckedChildren={formatMessage("drawsettings.close")}
          defaultChecked={settings?.showLogo}
          onChange={handleShowLogo}
        />
      </div>
      <Divider dashed />

      <div className="flex justify-between items-center">
        <span>{formatMessage("drawsettings.show_tag")}</span>
        <Switch
          checkedChildren={formatMessage("drawsettings.open")}
          unCheckedChildren={formatMessage("drawsettings.close")}
          defaultChecked={settings?.showTag}
          onChange={handleShowTag}
        />
      </div>
    </Drawer>
  );
};

export default DrawerSettings;
