import { Button, Form, Typography, message } from "antd";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CustomInput from "../../component/Input";
import { authApi } from "../../api/auth/auth.api";
import { useLoading } from "../../hook/useLoading";

const { Title } = Typography;

export default function ResetPassword() {
    const { loading, start, stop } = useLoading("reset-password");
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token");
  const location = useLocation();
  const { resetToken } = location.state;

  const onFinish = async (values: any) => {
    try {
      start();
      console.log({ token, ...values });
      const payload = {
        resetToken,
        newPass: values.password,
        confirmPass: values.confirmPassword,
      }
      // TODO: call api reset password
      await authApi.resetApi(payload);
      message.success("Password reset successfully!");
      navigate("/sign-in");
    } catch (err) {
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
