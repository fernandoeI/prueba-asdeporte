import { useTaskContext } from "@/context/TaskContext";
import { ITask } from "@/interfaces/task";

import { useState } from "react";

interface Props {
  task: ITask;
}

const Task = ({ task }: Props) => {
  const { onDelete, onUpdate } = useTaskContext();
  const [newTask, setNewTask] = useState(task);
  const isDisabled = !newTask.name ? "bg-gray-400" : "bg-blue-600";

  return (
    <div className="flex">
      <input
        type="text"
        className="border-2 p-2 m-2 w-10/12"
        value={newTask.name}
        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
      />
      <button
        className={`${isDisabled} text-white radius rounded-md p-2 m-2`}
        onClick={() => onUpdate({ task: newTask })}
      >
        Actualizar
      </button>
      <button
        className="bg-red-600 text-white radius rounded-md p-2 m-2"
        onClick={() => onDelete({ id: task.id })}
      >
        Borrar
      </button>
    </div>
  );
};

export default Task;
