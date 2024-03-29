import React, { Suspense } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector } from "react-redux";
import { Layout } from "antd";
import Sider from "./Sider";
import Header from "./Header";
import Tags from "@/components/Tags";
const { Content } = Layout;

const LayoutPage: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;
  const state: any = useSelector((state) => state);
  const { settings } = state;
  return (
    <Layout style={{ display: "flex", width: "100%" }}>
      <Sider />
      <Layout
        style={{
          overflow: "auto",
          height: "100vh",
          flex: "1",
        }}
      >
        <Header />
        {settings?.showTag ? <Tags /> : null}
        <Content
          style={{
            height: "calc(100% - 100px)",
            width: "100%",
            padding: "1rem",
          }}
        >
          <TransitionGroup>
            <CSSTransition
              key={pathname}
              timeout={500}
              classNames="fade"
              exit={false}
            >
              <Suspense fallback={<></>}>
                <Outlet />
              </Suspense>
            </CSSTransition>
          </TransitionGroup>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
