import { usersControllerFindAll, UsersControllerFindAllParams } from '@/shared/api/generated';
import { useQuery } from '@tanstack/react-query';

export const useUsers = (params: UsersControllerFindAllParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersControllerFindAll(params),
  });

  return { data, isLoading, error };
};
