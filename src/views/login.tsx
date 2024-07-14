'use client';

import { LoginForm } from '@/features/auth';
import styled from '@emotion/styled';
import React from 'react';

const LoginPage = () => {
  return (
    <Root>
      <Title>Sign in</Title>
      <LoginForm />
    </Root>
  );
};

const Root = styled.main`
  height: 100vh;
  display: flex;
  padding: 124px;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  padding-bottom: 24px;
`;

export default LoginPage;
