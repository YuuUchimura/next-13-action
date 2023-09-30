import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import DoneTodo from "./DoneTodo";
import { addTodo, deleteTodo } from "./actions";
import AddTodo from "./AddTodo";

const Page = async () => {
  const todos = await prisma.todo.findMany();

  return (
    <div className="m-8">
      <h1 className="text-xl font-bold">Todo一覧</h1>
      <ul className="mt-8">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center space-x-2 ${
              todo.isCompleted ? "line-through" : ""
            }`}
          >
            <form>
              <DoneTodo id={todo.id} isCompleted={todo.isCompleted} />
              <span>{todo.name}</span>
              <input type="hidden" name="id" value={todo.id} />
              <button
                className="bg-red-500 px-2 py-1 rounded-lg text-sm text-white"
                formAction={deleteTodo}
              >
                削除
              </button>
            </form>
          </li>
        ))}
      </ul>
      <AddTodo />
    </div>
  );
};

export default Page;
