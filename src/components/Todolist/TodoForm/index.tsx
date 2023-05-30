import { useState } from "react";
import Button from "../../common/Button";

const TodoForm: React.FC<{ addTodo: (text: string) => void }> = ({
  addTodo,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue !== "") {
      addTodo(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex mb-4">
      <input
        type="text"
        className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white w-full"
        placeholder="Enter a task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        variant="primary"
        className="rounded-r-lg w-36"
        title="Add Todo"
        onClick={handleSubmit}
      />
    </form>
  );
};

export default TodoForm;
