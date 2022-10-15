import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import * as Pages from "../pages";
import bg1 from "../public/img/bg1.jpg";
import bg from "../public/img/bg.jpg";
// import {
//     DesktopOutlined,
//     FileOutlined,
//     PieChartOutlined,
//     TeamOutlined,
//     UserOutlined,
// } from '@ant-design/icons';

const { Content, Sider, Header } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("首页", "Home"),
  getItem("番剧列表", "Video", null, [
    getItem("番剧日历", "VideoCalendar"),
    getItem("番剧索引", "VideoIndex"),
  ]),
  getItem("订阅管理", "Subscribe"),
  getItem("设置", "Sutup"),
];

export default function Router() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  function gotoPath(option) {
    console.log();
    navigate(`/${option.key}`);
  }
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={gotoPath}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            backgroundColor: "#fff",
            letterSpacing: "3px",
            fontSize: "24px",
            fontWeight: "bolder",
          }}
        >
          二次元da☆ze
        </Header>
        <Content
          style={{
            padding: "10px",
            backgroundImage: `url(${bg1}), url(${bg})`,
            backgroundSize: "100% auto",
            backgroundRepeat: "no-repeat, repeat",
          }}
        >
          <Routes>
            {Object.values(Pages).map((page) => {
              return (
                <Route
                  key={page.name}
                  path={`/${page.name}`}
                  element={React.createElement(page)}
                />
              );
            })}
            <Route
              key={"home"}
              path={`/`}
              element={<Pages.Home></Pages.Home>}
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
