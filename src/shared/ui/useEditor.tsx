import EditorJS, { OutputData } from '@editorjs/editorjs';
import { EditorConfig } from '@editorjs/editorjs/types/configs';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface UseEditorProps extends EditorConfig {
  setBlocks: (blocks: OutputData['blocks']) => void;
  initialBlocks?: OutputData['blocks'];
}

const useEditor = (config: UseEditorProps) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const editorInstance = useRef<EditorJS | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!editorInstance.current && containerRef.current) {
      editorInstance.current = new EditorJS({
        ...config,
        holder: containerRef.current,
        data: {
          blocks: config.initialBlocks || [],
        },
        onReady: () => {
          setIsEditorReady(true);
          config.onReady?.();
        },
        onChange: async () => {
          const data = await editorInstance.current?.save();
          data && config.setBlocks(data.blocks);
        },
      });
    }

    return () => {
      if (editorInstance.current && editorInstance.current.destroy) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, [containerRef.current]);

  const clearEditor = useCallback(() => {
    editorInstance.current?.clear();
  }, []);

  return {
    isEditorReady,
    clearEditor,
    componentEditor: <div ref={containerRef} />,
    editor: editorInstance.current,
  };
};

export default useEditor;
