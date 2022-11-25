import React from "react";
import { Tooltip, Space } from "antd";
import { FullscreenOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";
import screenfull from "screenfull";

const FullScreen: React.FC<any> = (props: any) => {
  const { fullscreenRef } = props;
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const handleFullScrren = () => {
    screenfull.toggle();
  };
  return (
    <div ref={fullscreenRef}>
      <Tooltip placement="bottom" title={formatMessage("fullscreen.title")}>
        <Space>
          <FullscreenOutlined onClick={handleFullScrren} className="text-2xl" />
        </Space>
      </Tooltip>
    </div>
  );
};

export default FullScreen;
