import { Layout } from "antd";
import Sidebar from "./Sidebar";
import HeaderBar from "./Header";

const { Content } = Layout;

export default function MainLayout() {
  return (
    <Layout className="main-layout">
      <Sidebar />

      <Layout>
        <HeaderBar />

        <Content className="main-content">
          <div className="page-container">
            Content hiển thị ở đây 🚀
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
