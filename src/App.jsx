import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, updateTodo } from "./Store/Slice/Slice";

export default function App() {
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddOrUpdate = () => {
    if (!input.trim()) return;
    if (editId) {
      dispatch(updateTodo({ id: editId, text: input }));
      setEditId(null);
    } else {
      dispatch(addTodo(input));
    }
    setInput("");
  };

  const handleEdit = (todo) => {
    setInput(todo.text);
    setEditId(todo.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddOrUpdate();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-6">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-8 border border-gray-200 text-center transition-all duration-300 hover:shadow-2xl">
        
        <h2 className="text-4xl font-extrabold mb-8 text-gray-800 tracking-tight">
          📝 My Todo List
        </h2>

        {/* Input & Button */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown} // 👈 Enter key listener
            placeholder="Add a new task..."
            className="flex-1 border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 shadow-sm transition-all duration-200"
          />
          <button
            onClick={handleAddOrUpdate}
            className={`${
              editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-indigo-500 hover:bg-indigo-600"
            } text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95`}
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-4">
          {!todos.length && (
            <p className="text-gray-500 italic">No todos yet! 🚀</p>
          )}
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-50 border border-gray-200 shadow-sm p-4 rounded-xl hover:shadow-lg hover:bg-white transition-all duration-200"
            >
              <span className="text-gray-800 font-medium">{todo.text}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(todo)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
