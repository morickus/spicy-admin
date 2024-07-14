'use client';

import { ROUTES } from '@/shared/constants/routes';
import { AlignLeftOutlined, TagsOutlined, UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Layout, Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';

const { Sider, Content } = Layout;

interface PageLayoutProps {
  children?: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <MainLayout>
      <Sider>
        <Logo>Spicy Admin</Logo>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathname]}
          onClick={({ key }) => router.push(key)}
          items={[
            {
              key: ROUTES.ARTICLES.INDEX,
              icon: <AlignLeftOutlined />,
              label: 'Articles',
            },
            {
              key: ROUTES.CATEGORIES,
              icon: <TagsOutlined />,
              label: 'Categories',
            },
            {
              key: ROUTES.USERS,
              icon: <UserOutlined />,
              label: 'Users',
            },
          ]}
        />
      </Sider>
      <Layout>
        <ContentStyled>{children}</ContentStyled>
      </Layout>
    </MainLayout>
  );
};

const Logo = styled.p`
  margin: 16px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
`;

const MainLayout = styled(Layout)`
  min-height: 100vh;
`;

const ContentStyled = styled(Content)`
  padding: 24px;
`;

export default PageLayout;
