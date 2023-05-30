import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem, { Todo } from "./TodoItem";
import { User, signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

interface TodoListProps {
  user: User;
}

const TodoList: React.FC<TodoListProps> = ({ user }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: todos.length + 1,
      text: text,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="container mx-auto p-4 pt-8">
      <div className="flex justify-between pb-5">
        <h1 className="text-3xl font-bold mb-4">Todo List</h1>
        <div className="flex items-center gap-3">
          {user.email}
          <button
            onClick={logout}
            className="text-lg font-bold p-2 bg-red-900 rounded-full text-white items-center"
          >
            Log out
          </button>
        </div>
      </div>
      <TodoForm addTodo={addTodo} />
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
