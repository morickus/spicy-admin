'use client';

import EditorJS, { OutputData } from '@editorjs/editorjs';
import React, { FC, useEffect, useRef } from 'react';

interface EditorProps {
  onChange: (blocks: OutputData['blocks']) => void;
  initialBlocks?: OutputData['blocks'];
}

const Editor: FC<EditorProps> = ({ onChange, initialBlocks = [] }) => {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: 'editor',
        placeholder: 'Enter the text of your article',
        data: {
          blocks: initialBlocks,
        },
        tools: {
          paragraph: {
            inlineToolbar: ['bold', 'italic'],
          },
        },
        async onChange(api, event) {
          const data = await editorRef.current?.save();
          data && onChange(data.blocks);
        },
      });
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
    };
  }, []);

  return <div id="editor" />;
};

export default Editor;
