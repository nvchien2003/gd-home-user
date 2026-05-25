import { Button, Form, Typography, message } from "antd";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../../component/Input";
import { authApi } from "../../api/auth/auth.api";
import { useLoading } from "../../hook/useLoading";
import type { ResetPasswordInterface } from "../../api/auth/auth.interface";

const { Title } = Typography;

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordLocationState {
  resetToken?: string;
}

export default function ResetPassword() {
  const { loading, start, stop } = useLoading("reset-password");
  const navigate = useNavigate();
  const location = useLocation();
  const { resetToken } = (location.state ?? {}) as ResetPasswordLocationState;

  if (!resetToken) {
    return <Navigate to="/forgot-password" replace />;
  }

  const onFinish = async (values: ResetPasswordFormValues) => {
    try {
      start();
      const payload: ResetPasswordInterface = {
        resetToken,
        newPass: values.password,
        confirmPass: values.confirmPassword,
      }
      await authApi.resetApi(payload);
      message.success("Password reset successfully!");
      navigate("/sign-in");
    } catch {
      message.error("Reset failed!");
    } finally {
      stop();
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-card">
        <Title level={3} className="signin-title">
          Create New Password 🔑
        </Title>

        <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 16 }}>
          <CustomInput
            name="password"
            label="New Password"
            type="password"
            className="input"
            rules={[{ required: true }]}
          />

          <CustomInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            className="input"
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match!");
                },
              }),
            ]}
          />

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
