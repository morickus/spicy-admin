'use client';

import CategoriesSelect from '@/shared/ui/CategorySelect';
import { OutputBlockData } from '@editorjs/editorjs';
import styled from '@emotion/styled';
import { Button, Form, FormProps, Input, message } from 'antd';
import dynamic from 'next/dynamic';
import React, { FC, useEffect, useState } from 'react';
import { useArticle } from '../model/useArticle';

const DynamicEditor = dynamic(() => import('@/shared/ui/Editor'), {
  ssr: false,
});

interface ArticleFormProps {
  slug?: string;
}

type FieldType = {
  categories: string[];
  title: string;
};

const ArticleForm: FC<ArticleFormProps> = ({ slug }) => {
  const [form] = Form.useForm();
  const { data, isLoading, error, createArticle, updateArticle, isPending } = useArticle(slug);
  const [blocks, setBlocks] = useState<OutputBlockData[]>([]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title,
        categories: data.categories.map((c) => c.slug),
        content: data.content,
      });
      setBlocks(data.content);
    }
  }, [data, form]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const handleSubmit: FormProps<FieldType>['onFinish'] = (values) => {
    if (blocks.length === 0) {
      return message.error('content cannot be empty');
    }

    const articleData = {
      ...values,
      content: blocks,
    };

    if (slug) {
      data && updateArticle({ id: data.id, body: articleData });
    } else {
      createArticle(articleData);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="categories"
        rules={[{ required: true, message: 'Please select a category!' }]}
      >
        <CategoriesSelect mode="multiple" placeholder="Categories" />
      </Form.Item>
      <Form.Item
        name="title"
        rules={[{ required: true, message: 'Please input the title of the article!' }]}
      >
        <EditorInput placeholder="Title" />
      </Form.Item>
      <div className="editor">
        <DynamicEditor initialBlocks={blocks} onChange={(arr) => setBlocks(arr)} />
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={isPending}>
          {slug ? 'Update' : 'Create'} Article
        </Button>
      </Form.Item>
    </Form>
  );
};

const EditorInput = styled(Input)`
  font-size: 36px;
  border-radius: 0;
  font-weight: 500;
  line-height: 47px;
  border: none !important;
  box-shadow: none !important;
`;

export default ArticleForm;
