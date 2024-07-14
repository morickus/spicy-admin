'use client';

import { withAuth } from '@/features/auth';
import CategoriesTable from '@/widgets/CategoriesTable/ui/CategoriesTable';
import styled from '@emotion/styled';

const CategoriesPage = () => {
  return (
    <div>
      <Title>Categories</Title>
      <CategoriesTable />
    </div>
  );
};

const Title = styled.h1`
  padding-bottom: 12px;
`;

export default withAuth(CategoriesPage);
