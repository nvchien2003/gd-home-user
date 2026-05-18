import { Button, Form, Typography, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../../component/Input';
import { authApi } from '../../api/auth/auth.api';
import type { ForgotInterface } from '../../api/auth/auth.interface';

const { Title, Text } = Typography;

export default function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: ForgotInterface) => {
        try {
            setLoading(true);
            const res = await authApi.forgotApi(values);
            message.success('Reset link sent to your email!');
            navigate("/verify-otp", {
                state: {
                    email: res.email,
                    type: res.type,
                }
            });
        } catch {
            message.error('Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signin-wrapper">
            <div className="signin-card">
                <Title level={3} className="signin-title">
                    Forgot Password 🔑
                </Title>

                <Text type="secondary" className="signin-subtitle">
                    Enter your email to reset password
                </Text>

                <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 24 }}>
                    <CustomInput
                        label='Email'
                        name='email'
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Invalid email format' },
                        ]}
                        className='input'
                        prefix={<MailOutlined />}
                        placeholder="admin@email.com"
                    />

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={loading}
                        >
                            Send Reset Link
                        </Button>
                    </Form.Item>
                </Form>

                <Text className="signin-subtitle">
                    Back to <Link to="/sign-in">Sign In</Link>
                </Text>
            </div>
        </div>
    );
}
