import { Layout, Menu, Button } from "antd";
import {
  DashboardOutlined,
  HomeOutlined,
  SettingOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

export default function Sidebar({
  collapsed,
  onClose,
}: {
  collapsed: boolean;
  onClose: () => void;
}) {
  return (
    <Sider
      width={220}
      collapsedWidth={0}
      collapsed={!collapsed}
      theme="dark"
      className="app-sider"
    >
      <div className="sider-header">
        <div className="logo">GD HOME</div>

        <Button
          className="close-sider-btn"
          icon={<CloseCircleOutlined />}
          onClick={onClose}
        />
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          { key: "1", icon: <DashboardOutlined />, label: "Dashboard" },
          { key: "2", icon: <HomeOutlined />, label: "Properties" },
          { key: "3", icon: <SettingOutlined />, label: "Setting" },
        ]}
      />
    </Sider>
  );
}
