import { Layout } from "antd";
import { useState } from "react";
import Sidebar from "./Sidebar";
import HeaderBar from "./Header";

const { Content } = Layout;

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="main-layout">
      <Sidebar collapsed={collapsed} onClose={() => setCollapsed(false)} />

      <Layout>
        <HeaderBar
          collapsed={collapsed}
          onToggle={() => setCollapsed(true)}
        />

        <Content className="main-content">
          <div className="page-container">
            Content hiển thị ở đây 🚀
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
