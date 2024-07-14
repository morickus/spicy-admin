import {
  articlesControllerCreate,
  articlesControllerFindOne,
  articlesControllerUpdate,
  CreateArticleDto,
  UpdateArticleDto,
} from '@/shared/api/generated';
import useMutationWithLoading from '@/shared/lib/react-query/useMutationWithLoading';
import { useQuery } from '@tanstack/react-query';

interface UpdateArticleProps {
  id: number;
  body: UpdateArticleDto;
}

export const useArticle = (slug?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => articlesControllerFindOne(slug as string),
    enabled: typeof slug === 'string',
  });

  const { mutate: createArticle, isPending: isPendingCreate } = useMutationWithLoading(
    (body: CreateArticleDto) => articlesControllerCreate(body),
    'Article created successfully',
    'Failed to create article',
  );

  const { mutate: updateArticle, isPending: isPendingUpdate } = useMutationWithLoading(
    ({ id, body }: UpdateArticleProps) => articlesControllerUpdate(id, body),
    'Article updated successfully',
    'Failed to update article',
    ['articles'],
  );

  const isPending = isPendingCreate || isPendingUpdate;

  return { data, isLoading, error, createArticle, updateArticle, isPending };
};
