'use client';

import { authControllerGetSessionInfo } from '@/shared/api/generated';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';

// TODO: fix types, check build
export const withAuth = (Component: any) => {
  return function withAuth(props: any) {
    const { data, isLoading, isError } = useQuery({
      queryKey: ['session'],
      queryFn: () => authControllerGetSessionInfo(),
      retry: false,
    });

    if (isLoading) {
      return <Spin />;
    }

    if (isError) {
      return <div>error</div>;
    }

    if (data?.role !== 'ADMIN') {
      return <div>403 Forbidden</div>;
    }

    return <Component {...props} />;
  };
};
