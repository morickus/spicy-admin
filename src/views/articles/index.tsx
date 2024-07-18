'use client';

import { withAuth } from '@/features/auth';
import { ROUTES } from '@/shared/constants/routes';
import ArticlesTable from '@/widgets/ArticlesTable/ui/ArticlesTable';
import styled from '@emotion/styled';
import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';

const ArticlesPage = () => {
  return (
    <div>
      <Title>Articles</Title>
      <Link href={ROUTES.ARTICLES.CREATE} target="_blank">
        <Button type="primary" style={{ marginBottom: 16 }}>
          Create article
        </Button>
      </Link>
      <ArticlesTable />
    </div>
  );
};

const Title = styled.h1`
  padding-bottom: 12px;
`;

export default withAuth(ArticlesPage);
