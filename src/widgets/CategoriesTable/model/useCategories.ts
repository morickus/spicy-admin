import {
  categoriesControllerCreate,
  categoriesControllerDelete,
  categoriesControllerFindAll,
  categoriesControllerUpdate,
} from '@/shared/api/generated';
import useMutationWithLoading from '@/shared/lib/react-query/useMutationWithLoading';
import { useQuery } from '@tanstack/react-query';

export interface UpdateCategoryArgs {
  id: number;
  name: string;
}

export const useCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesControllerFindAll(),
  });

  const { mutate: deleteCategory } = useMutationWithLoading(
    (id: number) => categoriesControllerDelete(id),
    'Category deleted successfully',
    'Failed to delete category',
    ['categories'],
  );

  const { mutate: createCategory } = useMutationWithLoading(
    (name: string) => categoriesControllerCreate({ name }),
    'Category created successfully',
    'Failed to create category',
    ['categories'],
  );

  const { mutate: updateCategory } = useMutationWithLoading(
    ({ id, name }: UpdateCategoryArgs) => categoriesControllerUpdate(id, { name }),
    'Category updated successfully',
    'Failed to update category',
    ['categories'],
  );

  return { data, isLoading, error, deleteCategory, createCategory, updateCategory };
};
