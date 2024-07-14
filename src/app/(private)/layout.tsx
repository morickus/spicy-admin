import PageLayout from '@/widgets/layout/page-layout';
import { ReactNode } from 'react';

interface PrivateLayoutProps {
  children?: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  return <PageLayout>{children}</PageLayout>;
}
