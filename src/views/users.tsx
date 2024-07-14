'use client';

import { withAuth } from '@/features/auth';
import UsersTable from '@/widgets/UsersTable/ui/UsersTable';
import styled from '@emotion/styled';

const UsersPage = () => {
  return (
    <div>
      <Title>Users</Title>
      <UsersTable />
    </div>
  );
};

const Title = styled.h1`
  padding-bottom: 12px;
`;

export default withAuth(UsersPage);
