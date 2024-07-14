'use client';

import { authControllerGetSessionInfo } from '@/shared/api/generated';
import { ROUTES } from '@/shared/constants/routes';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, ReactElement } from 'react';

export function withAuth<P>(Component: (props: P) => ReactElement) {
  return function withAuth(props: PropsWithChildren<P>) {
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
    }

    return <Component {...props} />;
  };
}
