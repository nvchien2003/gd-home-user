import { Button, Form, Input, Typography, message } from "antd";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../../api/auth/auth.api";
import type { AuthVerificationType, VerifyInterface } from "../../api/auth/auth.interface";

const { Title, Text } = Typography;

interface VerifyOtpFormValues {
  otp: string;
}

interface VerifyOtpLocationState {
  email?: string;
  type?: AuthVerificationType;
}

export default function VerifyOtp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, type } = (location.state ?? {}) as VerifyOtpLocationState;

  if (!email || !type) {
    return <Navigate to="/forgot-password" replace />;
  }

  const onFinish = async (values: VerifyOtpFormValues) => {
    try {
      setLoading(true);
      const payload: VerifyInterface = {
        email,
        code: values.otp,
        type,
      }

      const res = await authApi.verifyOtp(payload)
      message.success("Verify OTP success!");
      if (type === 'RESET') {
        navigate("/reset-password", {
          state: { resetToken: res.resetToken}
        });
      } else {
        navigate("/sign-in");
      }
    } catch {
      message.error("Invalid OTP!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-card">
        <Title level={3} className="signin-title">
          Verify OTP 🔐
        </Title>

        <Text type="secondary" className="signin-subtitle">
          Enter the 6-digit code sent to your email
        </Text>

        <Form
          name="verify-otp"
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="otp"
            rules={[{ required: true, message: "Please enter OTP" }]}
          >
            <Input.OTP
              length={6}
              size="large"
              inputMode="numeric"
              autoFocus
              formatter={(str) => str.replace(/\D/g, "")}
            />

          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              Verify
            </Button>
          </Form.Item>

          <Text className="signin-subtitle">
            Didn’t get code? <Link to="/forgot-password">Resend</Link>
          </Text>
        </Form>
      </div>
    </div>
  );
}
