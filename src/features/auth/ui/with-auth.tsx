'use client';

import { authControllerGetSessionInfo } from '@/shared/api/generated';
import { ROUTES } from '@/shared/constants/routes';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';

// TODO: fix types, check build
export const withAuth = (Component: any) => {
  return function withAuth(props: any) {
    const router = useRouter();

    const { isLoading, isError } = useQuery({
      queryKey: ['session'],
      queryFn: () => authControllerGetSessionInfo(),
    });

    if (isLoading) {
      return <Spin />;
    }

    if (isError) {
      router.replace(ROUTES.LOGIN);
      return null;
    }

    return <Component {...props} />;
  };
};
