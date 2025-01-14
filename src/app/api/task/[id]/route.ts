import { NextRequest, NextResponse } from "next/server";
import { ITask } from "@/interfaces/task";
import fs from "fs";
import path from "path";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const usersPath = path.join(process.cwd(), "/public/tasks.json");
  const file = fs.readFileSync(usersPath);
  const data = JSON.parse(file.toString());

  const index = data.findIndex((x: ITask) => x.id === id);
  data.splice(index, 1);

  fs.writeFileSync(
    process.cwd() + "/public/tasks.json",
    JSON.stringify(data, null, 2)
  );

  return NextResponse.json("Success");
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const body = await req.json();

  const file = fs.readFileSync(process.cwd() + "/public/tasks.json", "utf8");
  const data = JSON.parse(file);

  const index = data.findIndex((x: ITask) => x.id === id);
  data.splice(index, 1, body);

  fs.writeFileSync(
    process.cwd() + "/public/tasks.json",
    JSON.stringify(data, null, 2)
  );

  return NextResponse.json(body);
}
