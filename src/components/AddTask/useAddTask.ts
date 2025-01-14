import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface Props {
  refresh: () => void;
}
export const useAddTask = ({ refresh }: Props) => {
  const onAdd = async ({ name }: { name: string }) => {
    try {
      await axios.post("/api/task", { id: uuidv4(), name });
      refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return { onAdd };
};
