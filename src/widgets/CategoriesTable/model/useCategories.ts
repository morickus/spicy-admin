import {
  categoriesControllerCreate,
  categoriesControllerDelete,
  categoriesControllerFindAll,
  categoriesControllerUpdate,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@/shared/api/generated';
import useMutationWithLoading from '@/shared/lib/react-query/useMutationWithLoading';
import { useQuery } from '@tanstack/react-query';

export interface UpdateCategoryArgs {
  id: number;
  body: UpdateCategoryDto;
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
    (body: CreateCategoryDto) => categoriesControllerCreate(body),
    'Category created successfully',
    'Failed to create category',
    ['categories'],
  );

  const { mutate: updateCategory } = useMutationWithLoading(
    ({ id, body }: UpdateCategoryArgs) => categoriesControllerUpdate(id, body),
    'Category updated successfully',
    'Failed to update category',
    ['categories'],
  );

  return { data, isLoading, error, deleteCategory, createCategory, updateCategory };
};
