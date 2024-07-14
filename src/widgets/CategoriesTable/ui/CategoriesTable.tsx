import { UpdateCategoryArgs, useCategories } from '@/widgets/CategoriesTable/model/useCategories';
import CategoryModal from '@/widgets/CategoriesTable/ui/CategoryModal';
import { Button, Table } from 'antd';
import React, { useState } from 'react';
import { getColumns } from './Columns';

const CategoriesTable: React.FC = () => {
  const { data, isLoading, error, deleteCategory, createCategory, updateCategory } =
    useCategories();
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<UpdateCategoryArgs | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const openModal = (category: UpdateCategoryArgs | null) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingCategory(null);
    setShowModal(false);
  };

  const onSubmit = (name: string) => {
    if (editingCategory) {
      updateCategory({ id: editingCategory.id, name });
    } else {
      createCategory(name);
    }
    closeModal();
  };

  return (
    <div>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={() => openModal(null)}>
        Create category
      </Button>
      <Table
        rowKey="id"
        dataSource={data}
        pagination={false}
        columns={getColumns(deleteCategory, (id, name) => openModal({ id, name }))}
      />
      {showModal && (
        <CategoryModal
          onSubmit={onSubmit}
          onCancel={closeModal}
          initialName={editingCategory ? editingCategory.name : ''}
        />
      )}
    </div>
  );
};

export default CategoriesTable;
