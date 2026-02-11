import { Layout, Avatar, Button, Dropdown, Modal } from "antd";
import type { MenuProps } from "antd";
import {
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";

const { Header } = Layout;

export default function HeaderBar({
  onToggle,
  collapsed,
}: {
  onToggle: () => void;
  collapsed: boolean;
}) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // ==== LOGOUT LOGIC ====
  const handleLogout = () => {
    Modal.confirm({
      title: "Logout",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to logout?",
      okText: "Logout",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      onOk() {
        logout();
        navigate("/sign-in");
      },
    });
  };

  // ==== DROPDOWN ITEMS ====
  const items: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => navigate("/profile"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      danger: true,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <Header className={`header-bar ${collapsed ? "sidebar-open" : ""}`}>
      <div className="left">
        {!collapsed && (
          <Button type="text" onClick={onToggle} className="toggle-btn">
            <MenuUnfoldOutlined />
          </Button>
        )}

        <span className="header-title">Admin Panel</span>
      </div>

      <div className="right">
        <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]}>
          <div className="avatar-wrap">
            <Avatar style={{width: 32, height: 32}} size="large">U</Avatar>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
}
