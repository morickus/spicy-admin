import { queryClient } from '@/shared/lib/react-query/query-client';
import { MutationFunction, useMutation } from '@tanstack/react-query';
import { message } from 'antd';

const useMutationWithLoading = <TVariables, TData>(
  mutationFn: MutationFunction<TData, TVariables>,
  successMessage: string,
  errorMessage: string,
  queryKey?: string[],
) => {
  return useMutation({
    mutationFn,
    onMutate: () => {
      const hide = message.loading('Processing...', 0);
      return { hide };
    },
    onSettled: (data, error, variables, context) => {
      if (context?.hide) context.hide();
    },
    onSuccess: () => {
      message.success(successMessage);
      queryKey && queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      message.error(errorMessage);
    },
  });
};

export default useMutationWithLoading;
