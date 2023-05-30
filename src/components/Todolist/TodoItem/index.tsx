import { useState } from "react";
import Button from "../../common/Button";

export interface Todo {
  id: number;
  text: string;
}

const TodoItem: React.FC<{ todo: Todo; deleteTodo: (id: number) => void }> = ({
  todo,
  deleteTodo,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    deleteTodo(todo.id);
    setIsModalOpen(false);
  };

  return (
    <li className="flex items-center justify-between bg-beige mb-2 p-2 rounded-lg">
      <span className="text-navy">{todo.text}</span>
      <Button
        variant="secondary"
        title="Delete"
        onClick={() => setIsModalOpen(true)}
        className="rounded-lg bg-red-900"
      />
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <p>Are you sure you want to delete this todo?</p>
            <div className="flex justify-end mt-4 gap-3">
              <Button
                variant="secondary"
                title="Cancel"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg"
              />
              <Button
                variant="primary"
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
