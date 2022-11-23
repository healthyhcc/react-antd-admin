import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { Tour } from "antd";
import type { TourProps } from "antd";

const Guide = () => {
  const [open, setOpen] = useState<boolean>(true);
  const state: any = useSelector((state) => state);
  const { hamburgerRef, breadcrumbRef, fullscreenRef, intlRef, settingsRef } =
    state.refs;
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const steps: TourProps["steps"] = [
    {
      title: "react-antd-admin",
      description: formatMessage("guide.intro"),
      target: null,
    },
    {
      title: formatMessage("guide.hamburger_intro"),
      target: () => hamburgerRef.current,
    },
    {
      title: formatMessage("guide.breadcrumb_intro"),
      target: () => breadcrumbRef.current,
    },
    {
      title: formatMessage("guide.fullscreen_intro"),
      target: () => fullscreenRef.current,
    },
    {
      title: formatMessage("guide.intl_intro"),
      target: () => intlRef.current,
    },
    {
      title: formatMessage("guide.settings_intro"),
      target: () => settingsRef.current,
    },
  ];

  return <Tour open={open} onClose={() => setOpen(false)} steps={steps} />;
};

export default Guide;
