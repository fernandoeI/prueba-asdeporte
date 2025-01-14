"use client";
import { ITask } from "@/interfaces/task";
import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface Props {
  children: React.ReactNode;
}

interface TaskContextType {
  tasks: ITask[];
  loading: boolean;
  onAdd: ({ name }: { name: string }) => void;
  onDelete: ({ id }: { id: string }) => void;
  onUpdate: ({ task }: { task: ITask }) => void;
}

const TaskContext = createContext<TaskContextType>();

export const useTaskContext = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }: Props) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/task");
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onAdd = async ({ name }: { name: string }) => {
    try {
      await axios.post("/api/task", { id: uuidv4(), name });
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async ({ id }: { id: string }) => {
    try {
      await axios.delete(`/api/task/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdate = async ({ task }: { task: ITask }) => {
    try {
      await axios.put(`/api/task/${task.id}`, task);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, loading, onAdd, onDelete, onUpdate }}>
      {children}
    </TaskContext.Provider>
  );
};
