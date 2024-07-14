import { ROUTES } from '@/shared/constants/routes';
import Link from 'next/link';

export default function Home() {
  return <Link href={ROUTES.ARTICLES.INDEX}>ARTICLES</Link>;
}
