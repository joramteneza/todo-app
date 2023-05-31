import { useState } from "react";
import Button from "../../common/Button";

export interface Todo {
  id: string;
  text?: string;
}

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  deleteTodo,
  updateTodo,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editText, setEditText] = useState(todo.text || "");

  const handleDelete = () => {
    deleteTodo(todo.id);
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    updateTodo(todo.id, editText);
    setIsModalOpen(false);
  };

  return (
    <li className="flex items-center justify-between bg-beige mb-2 p-2 rounded-lg">
      <span className="text-navy">{todo.text}</span>
      <div className="flex gap-3">
        <Button
          variant="secondary"
          title="Edit"
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-yellow-500"
        />
        <Button
          variant="secondary"
          title="Delete"
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-red-900"
        />
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg mb-4"
            />
            <div className="flex justify-end mt-4 gap-3">
              <Button
                variant="secondary"
                title="Cancel"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg"
              />
              <Button
                variant="primary"
                title="Save"
                onClick={handleUpdate}
                className="rounded-lg bg-green-500"
              />
              <Button
                variant="secondary"
                title="Delete"
                onClick={handleDelete}
                className="rounded-lg bg-red-900"
              />
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
