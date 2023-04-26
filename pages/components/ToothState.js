import { useState } from "react";

const ToothState = ({ toothState, onStateChange }) => {
  const [newState, setNewState] = useState(toothState);

  const handleStateChange = (event) => {
    setNewState(event.target.value);
  };

  const handleSave = () => {
    onStateChange(newState);
  };

  return (
    <div className=" rounded-lg shadow-md p-4">
      <h2 className="text-black text-lg font-bold mb-2">Tooth State Editor</h2>

      <div className="mb-4">
        <label htmlFor="state-select" className="block text-gray-700 font-bold mb-2">Tooth State:</label>
        <select
          id="state-select"
          className="w-full p-2 border border-gray-400 rounded-lg"
          value={newState}
          onChange={handleStateChange}
        >
          <option value="healthy">Healthy</option>
          <option value="decayed">Decayed</option>
          <option value="filled">Filled</option>
        </select>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default ToothState;
