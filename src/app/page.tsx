'use client';

import { ROUTES } from '@/shared/constants/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(ROUTES.ARTICLES.INDEX);
  }, []);

  return <Link href={ROUTES.ARTICLES.INDEX}>ARTICLES</Link>;
}
