import { Button, Form, Input, Checkbox, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/auth/auth.api";
import { useAuth } from "../../provider/AuthProvider";

const { Title, Text } = Typography;

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const res = await authApi.loginApi(values);
      console.log(res);
      login(res.data.access_token);
      message.success("Login successfully!");
      navigate("/");
    } catch (err) {
      message.error("Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <Title level={3} style={{ textAlign: "center" }}>
          Welcome Back 👋
        </Title>

        <Text type="secondary" style={{ display: "block", textAlign: "center" }}>
          Sign in to continue to Admin Panel
        </Text>

        <Form
          name="signin"
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="admin@email.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter password"
            />
          </Form.Item>

          <Form.Item>
            <div style={styles.row}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a href="/forgot-password">Forgot password?</a>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <Text style={{ textAlign: "center", display: "block" }}>
          Don’t have an account? <a href="/register">Register</a>
        </Text>
      </div>
    </div>
  );
}

const styles: any = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1677ff, #69b1ff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 380,
    background: "#fff",
    padding: "32px 28px",
    borderRadius: 12,
    boxShadow: "0 8px 30px rgba(0,0,0,.15)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
};
