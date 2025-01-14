import { useState } from "react";
import { useTaskContext } from "@/context/TaskContext";

const AddTask = () => {
  const { onAdd } = useTaskContext();
  const [name, setName] = useState("");
  const isDisabled = !name ? "bg-gray-400" : "bg-blue-600";

  return (
    <div className="flex justify-center items-center">
      <input
        type="text"
        className="border-2 p-2 m-2"
        placeholder="Nombre de la tarea"
        onChange={(e) => setName(e.target.value)}
        value={name || ""}
      />
      <button
        className={`text-white radius rounded-md p-2 m-2 ${isDisabled}`}
        type="button"
        disabled={!name}
        onClick={() => {
          onAdd({ name });
          setName("");
        }}
      >
        Añadir tarea
      </button>
    </div>
  );
};

export default AddTask;
