'use client';

import { authControllerGetSessionInfo } from '@/shared/api/generated';
import { ROUTES } from '@/shared/constants/routes';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// TODO: fix types, check build
export const withAuth = (Component: any) => {
  return function withAuth(props: any) {
    const router = useRouter();

    const { isLoading, isError } = useQuery({
      queryKey: ['session'],
      queryFn: () => authControllerGetSessionInfo(),
    });

    useEffect(() => {
      if (isError) {
        router.replace(ROUTES.LOGIN);
      }
    }, [isError, router]);

    if (isLoading) {
      return <Spin />;
    }

    if (isError) {
      return null;
    }

    return <Component {...props} />;
  };
};
