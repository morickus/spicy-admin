import { useUsers } from '@/widgets/UsersTable/model/useUsers';
import { getColumns } from '@/widgets/UsersTable/ui/Columns';
import { Pagination, Table } from 'antd';
import React, { useState } from 'react';

const UsersTable = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const { data, isLoading, error } = useUsers(pagination);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>No data</div>;

  const handleTableChange = (page: number, pageSize: number) => {
    setPagination({ page, limit: pageSize });
  };

  const { page, total } = data;

  return (
    <>
      <Table rowKey="id" dataSource={data?.data} pagination={false} columns={getColumns()} />
      <br />
      <Pagination
        current={page}
        pageSize={pagination.limit}
        total={total}
        onChange={handleTableChange}
        showSizeChanger
        pageSizeOptions={['10', '20', '30', '50']}
      />
    </>
  );
};

export default UsersTable;
