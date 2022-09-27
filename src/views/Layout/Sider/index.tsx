import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import DocumentTitle from "react-document-title";
import { Layout, Menu } from "antd";
import Logo from "@/components/Logo";
import menuList from "@/router/menuList";
import { setCollapse, addTag } from "@/store/store";
import { formatRole } from "@/utils";

type ArrayObjectType = Array<object>;
const Sider: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state: any = useSelector((state) => state);
  const settingsDispatch = useDispatch();
  const { user, settings } = state;
  const { pathname } = location;
  const { userInfo } = user;
  const { collapsed } = settings;
  const [menuPermission, setMenuPermission] = useState<any>([]);
  const [openKeys, setOpenKeys] = useState<any>([]);
  const [documentTitle, setDocumentTitle] = useState("");
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const onCollapse = (collapsed: boolean) => {
    const collapseAction = setCollapse(collapsed);
    settingsDispatch(collapseAction);
  };
  const handleAuthMenuItem = (item: any) => {
    const { roles } = item;
    if (!roles || roles.includes(formatRole(userInfo?.role))) {
      return true;
    }
    return false;
  };
  const handleMenuPermission = (menuList: ArrayObjectType) => {
    const menuData: ArrayObjectType = [];
    menuList.forEach((item: any) => {
      if (handleAuthMenuItem(item)) {
        menuData.push(item);
        if (item.children) {
          const children = handleMenuPermission(item.children);
          item.children = children;
        }
      }
    });
    return menuData;
  };
  const openKeysData: ArrayObjectType = [];
  const handleOpenKeys = (menuList: ArrayObjectType) => {
    menuList.forEach((item: any) => {
      if (item.children) {
        const cItem = item.children.find(
          (child: any) => pathname.indexOf(child?.key) === 0
        );
        if (cItem) {
          openKeysData.push(item.key);
          handleOpenKeys(item.children);
        }
      }
    });
  };
  let menuItemByKey: any = null;
  const handleFindMenuItemByKey = (
    menuList: ArrayObjectType,
    key: string
  ): any => {
    menuList.forEach((item: any) => {
      if (item.key === key) {
        menuItemByKey = item;
      } else {
        if (item.children) {
          handleFindMenuItemByKey(item.children, key);
        }
      }
    });
  };
  const handleDocumentTitle = (menuList: ArrayObjectType, pathKey: string) => {
    handleFindMenuItemByKey(menuList, pathKey);
    const lableId = menuItemByKey?.label?.props?.id;
    setDocumentTitle(formatMessage(lableId));
  };
  const handleSelectMenu = (data: any) => {
    const { key } = data;
    handleFindMenuItemByKey(menuList, key);
    handleDocumentTitle(menuList, key);
    const tagsAction = addTag({ label: menuItemByKey?.label?.props?.id, key });
    settingsDispatch(tagsAction);
    navigate(key);
  };
  useEffect(() => {
    const menuData = handleMenuPermission(menuList);
    setMenuPermission(menuData);
  }, []);
  useEffect(() => {
    handleOpenKeys(menuList);
    setOpenKeys(openKeysData);
    handleDocumentTitle(menuList, pathname);
  }, [pathname]);
  return (
    <DocumentTitle title={documentTitle}>
      <Layout.Sider
        theme={"dark"}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{ overflow: "auto", height: "100vh" }}
      >
        {settings?.showLogo ? <Logo /> : null}
        <div style={{ height: "calc(100% - 64px)" }}>
          <Menu
            mode="inline"
            theme="dark"
            items={menuPermission}
            defaultOpenKeys={openKeys}
            openKeys={openKeys}
            selectedKeys={[pathname]}
            onOpenChange={setOpenKeys}
            onSelect={handleSelectMenu}
          />
        </div>
      </Layout.Sider>
    </DocumentTitle>
  );
};

export default Sider;
