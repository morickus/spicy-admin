import { CreateCategoryDto } from '@/shared/api/generated';
import { UpdateCategoryArgs } from '@/widgets/CategoriesTable/model/useCategories';
import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';

interface CategoryModalProps {
  onSubmit: (body: CreateCategoryDto) => void;
  onCancel: () => void;
  initialData: UpdateCategoryArgs | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ onSubmit, onCancel, initialData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData.body);
    }
  }, [initialData, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onSubmit(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      open={true}
      title={initialData ? 'Edit category' : 'Create a new category'}
      okText={initialData ? 'Update' : 'Create'}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Category Name"
          rules={[{ required: true, message: 'Please input the name of the category!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="metaDescription"
          label="Meta description"
          rules={[{ max: 160, message: 'Maximum 160 characters!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
