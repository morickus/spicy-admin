'use client';

import { withAuth } from '@/features/auth';
import ArticleForm from '@/widgets/ArticleForm/ui/ArticleForm';
import styled from '@emotion/styled';
import React from 'react';

interface EditArticlePageProps {
  params: {
    slug?: string;
  };
}

const EditArticlePage = ({ params: { slug } }: EditArticlePageProps) => {
  return (
    <Root>
      <Title>{slug ? 'Edit' : 'Create'} Article</Title>
      <ArticleForm slug={slug} />
    </Root>
  );
};

const Root = styled.div`
  max-width: 800px;
  background: #fff;
  margin: 24px auto;
  padding: 24px 64px;
`;

const Title = styled.h1`
  padding-bottom: 12px;
`;

export default withAuth(EditArticlePage);
