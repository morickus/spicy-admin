import { CategoryResponseDto } from '@/shared/api/generated';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, TableProps } from 'antd';
import React from 'react';

export const getColumns = (
  deleteCategory: (id: number) => void,
  editCategory: (id: number) => void,
): TableProps<CategoryResponseDto>['columns'] => [
  {
    title: 'Slug',
    dataIndex: 'slug',
    key: 'slug',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Meta description',
    dataIndex: 'metaDescription',
    key: 'metaDescription',
  },
  {
    width: '150px',
    title: 'Articles count',
    dataIndex: 'countArticles',
    key: 'countArticles',
  },
  {
    width: '100px',
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="link" onClick={() => editCategory(record.id)} style={{ padding: '0' }}>
          <EditOutlined />
        </Button>
        <Popconfirm
          title="Delete?"
          onConfirm={() => deleteCategory(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined style={{ color: '#ff4d4f' }} />
        </Popconfirm>
      </Space>
    ),
  },
];
