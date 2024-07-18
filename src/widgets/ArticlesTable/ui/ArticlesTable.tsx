import { useArticles } from '@/widgets/ArticlesTable/model/useArticles';
import { getColumns } from '@/widgets/ArticlesTable/ui/Columns';
import { Pagination, Table } from 'antd';
import React, { useState } from 'react';

const ArticlesTable = () => {
  const [pagination, setPagination] = useState({ page: 1 });
  const { data, isLoading, error, deleteArticle } = useArticles(pagination);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>No data</div>;

  const { limitPage, currentPage, totalPages } = data;

  return (
    <>
      <Pagination
        showQuickJumper
        current={currentPage}
        showSizeChanger={false}
        total={totalPages * limitPage}
        onChange={(page: number) => setPagination({ page })}
      />
      <br />
      <Table
        rowKey="id"
        dataSource={data.data}
        pagination={false}
        columns={getColumns(deleteArticle)}
      />
      <br />
      <Pagination
        showQuickJumper
        current={currentPage}
        showSizeChanger={false}
        total={totalPages * limitPage}
        onChange={(page: number) => setPagination({ page })}
      />
    </>
  );
};

export default ArticlesTable;
