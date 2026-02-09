import { Layout, Avatar } from "antd";

const { Header } = Layout;

export default function HeaderBar() {
  return (
    <Header className="header-bar">
      <div className="left">Admin Panel</div>
      <div className="right">
        <Avatar>U</Avatar>
      </div>
    </Header>
  );
}
