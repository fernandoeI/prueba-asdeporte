import { NextRequest, NextResponse } from "next/server";
import { ITask } from "@/interfaces/task";
import fs from "fs";
import path from "path";

const filePath =
  process.env.NODE_ENV === "production"
    ? "/tmp/tasks.json"
    : path.join(process.cwd(), "/tmp/tasks.json");

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const file = fs.readFileSync(filePath);
  const data = JSON.parse(file.toString());

  const index = data.findIndex((x: ITask) => x.id === id);
  data.splice(index, 1);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json("Success");
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const body = await req.json();

  const file = fs.readFileSync(filePath);
  const data = JSON.parse(file.toString());

  const index = data.findIndex((x: ITask) => x.id === id);
  data.splice(index, 1, body);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json(body);
}
