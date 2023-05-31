import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem, { Todo } from "./TodoItem";
import { User, signOut } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import {
  collection,
  onSnapshot,
  query,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";

interface TodoListProps {
  user: User;
}

const TodoList: React.FC<TodoListProps> = ({ user }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr: Todo[] = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async (text: string) => {
    const newTodo: Todo = {
      id: (todos.length + 1).toString(),
      text: text,
    };

    // Add the new todo to the Firebase Firestore database
    const docRef = await addDoc(collection(db, "todos"), newTodo);

    // Update the local state with the newly added todo
    setTodos([...todos, { ...newTodo, id: docRef.id }]);
  };

  const deleteTodo = async (id: string) => {
    // Remove the todo from the database
    await updateDoc(doc(db, "todos", id), { deleted: true });

    // Remove the todo from the local state
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateTodo = async (id: string, newText: string) => {
    // Update the todo in the database
    await updateDoc(doc(db, "todos", id), { text: newText });

    // Update the todo in the local state
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      }
      return todo;
    });
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
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
