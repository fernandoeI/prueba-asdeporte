"use client";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") redirect("/");

  return (
    <div className="flex flex-col m-auto max-w-sm ">
      <h1 className="text-2xl font-bold m-4">Inicia sesión</h1>

      <button
        className="bg-sky-600 text-white radius rounded-md p-2 m-2  w-full"
        type="button"
        onClick={() => signIn()}
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
}
