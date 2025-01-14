import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath =
  process.env.NODE_ENV === "production"
    ? "/tmp/tasks.json"
    : path.join(process.cwd(), "/tmp/tasks.json");

export async function GET() {
  try {
    const initFile = () => {
      if (!fs.existsSync(filePath)) {
        const initialData = { message: "Archivo creado con éxito" };
        fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
        console.log("Archivo creado en:", filePath);
      } else {
        console.log("El archivo ya existe:", filePath);
      }
    };
    initFile();

    const file = fs.readFileSync(filePath);
    const data = JSON.parse(file.toString());
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest) {
  const file = fs.readFileSync(filePath);
  const data = JSON.parse(file.toString());

  const body = await req.json();
  fs.writeFileSync(filePath, JSON.stringify([...data, body], null, 2));

  return NextResponse.json(body);
}
