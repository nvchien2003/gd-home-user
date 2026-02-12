import { Button, Form, Typography, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../component/Input';

const { Title, Text } = Typography;

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            console.log(values);
            // TODO: call api register
            message.success('Register successfully!');
            navigate('/sign-in');
        } catch (err) {
            message.error('Register failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signin-wrapper">
            <div className="signin-card">
                <Title level={3} className="signin-title">
                    Create Account 🚀
                </Title>

                <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 16 }}>
                    <CustomInput
                        name="username"
                        label="Username"
                        className='input'
                        placeholder="Enter username"
                        rules={[{ required: true, message: "Username is required" }]}
                    />

                    <CustomInput
                        name="email"
                        label="Email"
                        className='input'
                        placeholder="Enter email"
                        rules={[
                            { required: true },
                            { type: "email", message: "Invalid email" },
                        ]}
                    />

                    <CustomInput
                        name="password"
                        label="Password"
                        type="password"
                        className='input'
                        placeholder="Enter password"
                        rules={[{ required: true }]}
                    />
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={loading}
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Form>

                <Text className="signin-subtitle">
                    Already have an account? <a href="/sign-in">Sign In</a>
                </Text>
            </div>
        </div>
    );
}
