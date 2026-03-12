import { Button, Form, Checkbox, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/auth/auth.api';
import { useAuth } from '../../provider/AuthProvider';
import CustomInput from '../../component/Input';

const { Title, Text } = Typography;

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const res = await authApi.loginApi(values);
      login(res.data.accessToken, res.data.user);
      message.success('Login successfully!');
      navigate('/');
    } catch (err) {
      message.error('Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-card">
        <Title level={3} className="signin-title">
          Welcome Back 👋
        </Title>

        <Text type="secondary" className="signin-subtitle">
          Sign in to continue to GD Home
        </Text>

        <Form
          name="signin"
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: 24 }}
        >
          {/* Email */}
          <CustomInput
            name="email"
            label="Email"
            type="email"
            className="input"
            prefix={<UserOutlined />}
            placeholder="admin@email.com"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Invalid email format' },
            ]}
          />

          {/* Password */}
          <CustomInput
            name="password"
            label="Password"
            type="password"
            className="input"
            prefix={<LockOutlined />}
            placeholder="Enter password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          />

          <Form.Item>
            <div className="signin-row">
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

        <Text className="signin-subtitle">
          Don’t have an account? <a href="/sign-up">Sign Up</a>
        </Text>
      </div>
    </div>
  );
}
