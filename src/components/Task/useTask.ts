import { ITask } from "@/interfaces/task";
import axios from "axios";

interface Props {
  refresh: () => void;
}

export const useTask = ({ refresh }: Props) => {
  const onDelete = async ({ id }: { id: string }) => {
    try {
      await axios.delete(`/api/task/${id}`);
      refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdate = async ({ task }: { task: ITask }) => {
    try {
      await axios.put(`/api/task/${task.id}`, task);
      refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return { onDelete, onUpdate };
};
