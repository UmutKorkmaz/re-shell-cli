import { useMutation, useQuery, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { TestAPIService } from './client';

export function usegetUsers(
  client: TestAPIService,
  params: any,
  options?: Omit<UseQueryOptions<unknown>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['getUsers', params],
    queryFn: () => client.getUsers(params),
    ...options,
  });
}

export function usecreateUserMutation(
  client: TestAPIService,
  options?: Omit<UseMutationOptions<unknown, unknown, any>, 'mutationFn'>
) {
  return useMutation({
    mutationFn: (params) => client.createUser(params),
    ...options,
  });
}

export function usegetUserById(
  client: TestAPIService,
  params: any,
  options?: Omit<UseQueryOptions<unknown>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['getUserById', params],
    queryFn: () => client.getUserById(params),
    ...options,
  });
}
