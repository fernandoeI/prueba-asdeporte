"use client";
import AddTask from "@/components/AddTask";
import Navbar from "@/components/Navbar";
import Task from "@/components/Task";
import { ITask } from "@/interfaces/task";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const { status } = useSession();

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

  useEffect(() => {
    getTasks();
  }, []);

  if (status === "unauthenticated") redirect("/auth");

  return (
    <>
      <Navbar />
      <div className="flex flex-col max-w-screen-md m-auto">
        <AddTask refresh={getTasks} />

        {loading ? (
          <p>Cargando</p>
        ) : (
          tasks.map((task) => (
            <Task key={task.id} task={task} refresh={getTasks} />
          ))
        )}
      </div>
    </>
  );
}
