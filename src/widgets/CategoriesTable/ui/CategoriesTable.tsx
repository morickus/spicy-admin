import { CreateCategoryDto } from '@/shared/api/generated';
import { UpdateCategoryArgs, useCategories } from '@/widgets/CategoriesTable/model/useCategories';
import CategoryModal from '@/widgets/CategoriesTable/ui/CategoryModal';
import { Button, Table } from 'antd';
import React, { FC, useState } from 'react';
import { getColumns } from './Columns';

const CategoriesTable: FC = () => {
  const { data, isLoading, error, deleteCategory, createCategory, updateCategory } =
    useCategories();
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<UpdateCategoryArgs | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const openModal = (id?: number) => {
    if (id) {
      const category = data && data.find((i) => i.id === id);
      if (category) {
        setEditingCategory({ id, body: category });
        setShowModal(true);
      }
    } else {
      setEditingCategory(null);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setEditingCategory(null);
    setShowModal(false);
  };

  const onSubmit = (body: CreateCategoryDto) => {
    if (editingCategory?.id) {
      updateCategory({ id: editingCategory.id, body });
    } else {
      createCategory(body);
    }
    closeModal();
  };

  return (
    <div>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={() => openModal()}>
        Create category
      </Button>
      <Table
        rowKey="id"
        dataSource={data}
        pagination={false}
        columns={getColumns(deleteCategory, (id) => openModal(id))}
      />
      {showModal && (
        <CategoryModal onSubmit={onSubmit} onCancel={closeModal} initialData={editingCategory} />
      )}
    </div>
  );
};

export default CategoriesTable;
