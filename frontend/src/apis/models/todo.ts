export type TodoModel = {
  id: number;
  title: string;
  status: "created" | "completed" | "on_going" | "problem";
  problem_desc?: string;
  created_at: string;
  updated_at: string;
};
