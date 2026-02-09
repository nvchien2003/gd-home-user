import { Layout, Avatar, Button } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";

const { Header } = Layout;

export default function HeaderBar({
  onToggle,
  collapsed,
}: {
  onToggle: () => void;
  collapsed: boolean;
}) {
  return (
    <Header className={`header-bar ${collapsed ? "sidebar-open" : ""}`}>
      <div className="left">
        {!collapsed && (
          <Button
            type="text"
            onClick={onToggle}
            className="toggle-btn"
          >
            <MenuUnfoldOutlined />
          </Button>
        )}

        <span className="header-title">Admin Panel</span>
      </div>

      <div className="right">
        <Avatar>U</Avatar>
      </div>
    </Header>
  );
}
