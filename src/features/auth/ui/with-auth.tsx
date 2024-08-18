'use client';

import { authControllerGetSessionInfo } from '@/shared/api/generated';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// TODO: fix types, check build
export const withAuth = (Component: any) => {
  return function withAuth(props: any) {
    const router = useRouter();

    const { data, isLoading, isError } = useQuery({
      queryKey: ['session'],
      queryFn: () => authControllerGetSessionInfo(),
      retry: false,
    });

    useEffect(() => {
      if (isError || (!isLoading && data?.role !== 'ADMIN')) {
        router.replace(`${process.env.NEXT_PUBLIC_DOMAIN}/sign-in`);
      }
    }, [data, isLoading, isError, router]);

    if (isLoading) {
      return <Spin />;
    }

    if (isError) {
      return null;
    }

    return <Component {...props} />;
  };
};
