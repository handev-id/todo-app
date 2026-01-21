import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import axiosInstance from "../axios";
import type { ApiResponse } from "../response.type";
import type { TodoModel } from "../models/todo";

export function todosIndexApi(
  params = {},
  options?: UseQueryOptions<ApiResponse<TodoModel[]>>,
) {
  return useQuery({
    queryKey: ["todos_index"],
    queryFn: async () => {
      const response = await axiosInstance.get("/todos", {
        params,
      });
      return response.data;
    },
    ...options,
  });
}

export function todoCreateApi(
  options?: UseMutationOptions<TodoModel, Error, Partial<TodoModel>>,
) {
  return useMutation({
    mutationKey: ["todo_create"],
    mutationFn: async (todo) => {
      const response = await axiosInstance.post("/todos", todo);
      return response.data;
    },
    ...options,
  });
}

export function todoUpdateApi(
  options?: UseMutationOptions<TodoModel, Error, Partial<TodoModel>>,
) {
  return useMutation({
    mutationKey: ["todo_update"],
    mutationFn: async (todo) => {
      const response = await axiosInstance.patch(`/todos/${todo.id}`, todo);
      return response.data;
    },
    ...options,
  });
}
