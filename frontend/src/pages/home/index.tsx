import { useState } from "react";
import {
  todoCreateApi,
  todosIndexApi,
  todoUpdateApi,
} from "../../apis/endpoints/todos";
import { Controller, useForm } from "react-hook-form";
import type { TodoModel } from "../../apis/models/todo";
import { todoStatusMap } from "../../utils/todo-status-map";
import Modal from "../../components/Modal";

export default function Home() {
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [problemDescModal, setProblemDescModal] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<Partial<TodoModel>>();

  const todosIndex = todosIndexApi({ search });

  const todoCreate = todoCreateApi({
    onSuccess: () => {
      resetTodo();
      todosIndex.refetch();
    },
  });

  const todoUpdate = todoUpdateApi({
    onSuccess: (todoUpdated) => {
      setProblemDescModal(false);
      resetTodo(todoUpdated);
      todosIndex.refetch();
    },
  });

  const onSubmit = async (data: Partial<TodoModel>) => {
    await (data.id ? todoUpdate : todoCreate).mutateAsync(data);
  };

  const resetTodo = (data?: TodoModel) => {
    reset(
      data || {
        id: undefined,
        title: "",
        status: "created",
        problem_desc: "",
      },
    );
  };

  if (todosIndex.isLoading) return <div className="p-4">Loading...</div>;
  if (todosIndex.isError)
    return (
      <div className="p-4 text-red-600">
        Error fetching todos: {(todosIndex.error as Error)?.message}
      </div>
    );

  return (
    <div className="p-4 flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <div>
          <input
            className="border rounded p-2 flex-1"
            placeholder="Add todo title..."
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Add
        </button>
      </form>

      <input
        className="border rounded p-2"
        placeholder="Search todo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            todosIndex.refetch();
          }
        }}
      />

      <table className="border-collapse border w-full">
        <thead>
          <tr className="bg-neutral-100">
            <th className="border p-2">#</th>
            <th className="border p-2 text-left">Title</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {(todosIndex.data?.data || []).map((todo, index) => (
            <tr key={todo.id}>
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2">{todo.title}</td>
              <td className="border p-2 text-center">
                <select
                  value={todo.status}
                  className="border rounded p-1"
                  onChange={(e) => {
                    const value = e.target.value as TodoModel["status"];
                    if (value === "problem") {
                      setProblemDescModal(true);
                      resetTodo({ ...todo, status: value });
                    } else {
                      onSubmit({ ...todo, status: value });
                    }
                  }}
                >
                  {Object.keys(todoStatusMap).map((key) => (
                    <option key={key} value={key}>
                      {todoStatusMap[key]}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => {
                    setDetailModal(true);
                    resetTodo(todo);
                  }}
                  className="text-blue-600 underline"
                >
                  Detail
                </button>
              </td>
            </tr>
          ))}

          {!todosIndex.data?.data.length && (
            <tr>
              <td className="border p-2 text-center text-gray-500" colSpan={4}>
                No Todo Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {detailModal && watch("id") && (
        <Modal title="Detail Todo">
          <div>Title: {watch("title")}</div>
          <div>Status: {todoStatusMap[watch("status")!]}</div>
          {watch("problem_desc") && (
            <div className="text-red-600">
              Problem Description: {watch("problem_desc")}
            </div>
          )}
          <button
            onClick={() => {
              setDetailModal(false);
              resetTodo();
            }}
            className="mt-2 bg-gray-700 text-white rounded px-3 py-1"
          >
            Close
          </button>
        </Modal>
      )}

      {problemDescModal && (
        <Modal title="Problem Description">
          <div>
            <label>Problem Description (Optional)</label>
            <Controller
              control={control}
              name="problem_desc"
              render={({ field: { value, onChange } }) => (
                <textarea
                  className="border rounded p-2 w-full"
                  rows={4}
                  value={value}
                  onChange={onChange}
                  placeholder="Describe the problem..."
                ></textarea>
              )}
            />
          </div>
          <div className="flex justify-between">
            <button
              className="bg-gray-700 text-white rounded px-3 py-1"
              onClick={() => {
                resetTodo();
                setProblemDescModal(false);
              }}
            >
              Close
            </button>
            <button
              className="bg-blue-500 text-white rounded px-3 py-1"
              onClick={() => handleSubmit(onSubmit)()}
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
