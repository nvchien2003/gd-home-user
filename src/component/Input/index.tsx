import { Form, Input } from 'antd';
import type { Rule } from 'antd/es/form';
import React from 'react';

interface FormInputProps {
  name?: string;
  label?: string;
  rules?: Rule[];
  placeholder?: string;
  prefix?: React.ReactNode;
  type?: 'text' | 'password' | 'email';
  className?: string;
}

export default function CustomInput({
  name,
  label,
  rules,
  placeholder,
  prefix,
  type = 'text',
  className,
}: FormInputProps) {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      {type === 'password' ? (
        <Input.Password
          className={className}
          prefix={prefix}
          placeholder={placeholder}
        />
      ) : (
        <Input
          className={className}
          prefix={prefix}
          placeholder={placeholder}
          type={type}
        />
      )}
    </Form.Item>
  );
}
