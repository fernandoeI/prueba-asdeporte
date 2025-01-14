"use client";
import AddTask from "@/components/AddTask";
import Navbar from "@/components/Navbar";
import Task from "@/components/Task";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useTaskContext } from "@/context/TaskContext";
import { ITask } from "@/interfaces/task";

export default function Home() {
  const { status } = useSession();
  const { tasks } = useTaskContext();

  if (status === "unauthenticated") redirect("/auth");

  return (
    <>
      <Navbar />
      <div className="flex flex-col max-w-screen-md m-auto">
        <AddTask />

        {tasks.length > 0 ? (
          tasks.map((task: ITask) => <Task key={task.id} task={task} />)
        ) : (
          <div>Agrega una nueva tarea</div>
        )}
      </div>
    </>
  );
}
