import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();
  return (
    <div className="flex justify-between items-center m-auto max-w-screen-md border-b mb-4">
      <h1 className="text-2xl font-bold">Lista de tareas</h1>
      <div className="flex items-center">
        <p className="text-xl">{data?.user?.name}</p>
        <button
          className="bg-red-600 text-white radius rounded-md p-2 m-2"
          type="button"
          onClick={() => signOut()}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Navbar;
