import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

export default function Sidebar() {
  return (
    <Sider width={220} theme="dark">
      <div className="logo">REAL ESTATE</div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <DashboardOutlined />,
            label: "Dashboard",
          },
          {
            key: "2",
            icon: <HomeOutlined />,
            label: "Properties",
          },
          {
            key: "3",
            icon: <SettingOutlined />,
            label: "Setting",
          },
        ]}
      />
    </Sider>
  );
}
