import { useCategories } from '@/widgets/CategoriesTable/model/useCategories';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import React, { FC } from 'react';

const CategoriesSelect: FC<SelectProps> = ({ ...props }) => {
  const { data, isLoading, error } = useCategories();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>No data</div>;

  return (
    <Select
      options={data.map((c) => ({ value: c.slug, label: <span>{c.name}</span> }))}
      {...props}
    />
  );
};

export default CategoriesSelect;
