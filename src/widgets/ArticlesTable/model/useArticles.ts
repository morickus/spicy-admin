import {
  articlesControllerDelete,
  articlesControllerFindAll,
  ArticlesControllerFindAllParams,
} from '@/shared/api/generated';
import useMutationWithLoading from '@/shared/lib/react-query/useMutationWithLoading';
import { useQuery } from '@tanstack/react-query';

export const useArticles = (params: ArticlesControllerFindAllParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['articles', params],
    queryFn: () => articlesControllerFindAll(params),
  });

  const { mutate: deleteArticle } = useMutationWithLoading(
    (id: number) => articlesControllerDelete(id),
    'Article deleted successfully',
    'Failed to delete article',
    ['articles'],
  );

  return { data, isLoading, error, deleteArticle };
};
