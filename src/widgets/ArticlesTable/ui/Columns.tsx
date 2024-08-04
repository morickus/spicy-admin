import { ArticleAllResponseDto } from '@/shared/api/generated';
import { ROUTES } from '@/shared/constants/routes';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Space, TableProps } from 'antd';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import Link from 'next/link';
import React from 'react';

export const getColumns = (
  deleteArticle: (id: number) => void,
): TableProps<ArticleAllResponseDto>['columns'] => [
  {
    title: 'Slug',
    dataIndex: 'slug',
    key: 'slug',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Excerpt',
    dataIndex: 'excerpt',
    key: 'excerpt',
  },
  {
    title: 'Meta description',
    dataIndex: 'metaDescription',
    key: 'metaDescription',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (_, { createdAt }) => (
      <>{format(new Date(createdAt), 'MMMM dd, yyyy, hh:mm a', { locale: enUS })}</>
    ),
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (_, { updatedAt }) => (
      <>{format(new Date(updatedAt), 'MMMM dd, yyyy, hh:mm a', { locale: enUS })}</>
    ),
  },
  {
    title: 'Author Id',
    dataIndex: 'authorId',
    key: 'authorId',
  },
  {
    title: 'Categories',
    dataIndex: 'categories',
    key: 'categories',
    render: (_, { categories }) => <>{categories.map((c) => c.name).join(', ')}</>,
  },
  {
    width: '100px',
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Link href={ROUTES.ARTICLES.EDIT(record.slug)} target="_blank">
          <EditOutlined />
        </Link>
        <Popconfirm
          title="Delete?"
          onConfirm={() => deleteArticle(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined style={{ color: '#ff4d4f' }} />
        </Popconfirm>
      </Space>
    ),
  },
];
