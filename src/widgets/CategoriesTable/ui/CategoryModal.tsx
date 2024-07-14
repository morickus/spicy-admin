import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';

interface CategoryModalProps {
  onSubmit: (name: string) => void;
  onCancel: () => void;
  initialName?: string;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ onSubmit, onCancel, initialName = '' }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ name: initialName });
  }, [initialName, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onSubmit(values.name);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      open={true}
      title={initialName ? 'Edit category' : 'Create a new category'}
      okText={initialName ? 'Update' : 'Create'}
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
      </Form>
    </Modal>
  );
};

export default CategoryModal;
