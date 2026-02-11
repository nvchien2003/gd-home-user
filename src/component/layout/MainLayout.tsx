import { Layout } from "antd";
import { useState } from "react";
import Sidebar from "./Sidebar";
import HeaderBar from "./Header";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  console.log(import.meta.env.VITE_BE_URL);

  return (
    <Layout className="main-layout">
      <Sidebar collapsed={collapsed} onClose={() => setCollapsed(false)} />

      <Layout>
        <HeaderBar
          collapsed={collapsed}
          onToggle={() => setCollapsed(true)}
        />

        <Content className="main-content">
             <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
}
