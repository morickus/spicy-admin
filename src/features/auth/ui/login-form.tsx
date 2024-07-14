'use client';

import { authControllerSignIn } from '@/shared/api/generated';
import { ROUTES } from '@/shared/constants/routes';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

type FieldType = {
  email?: string;
  password?: string;
};

export const LoginForm = () => {
  const router = useRouter();

  const signInMutation = useMutation({
    mutationFn: authControllerSignIn,
    onSuccess: () => {
      router.push(ROUTES.ARTICLES.INDEX);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  return (
    <Form onFinish={signInMutation.mutate} layout="vertical">
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Incorrect email!' },
        ]}
      >
        <Input size="large" type="email" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password size="large" />
      </Form.Item>
      <Form.Item>
        <Button
          disabled={signInMutation.isPending}
          htmlType="submit"
          type="primary"
          size="large"
          block
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
