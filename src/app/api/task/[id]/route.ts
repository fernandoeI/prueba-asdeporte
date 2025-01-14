import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { ITask } from "@/interfaces/task";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const file = await fs.readFile(
    process.cwd() + "/src/data/tasks.json",
    "utf8"
  );
  const data = JSON.parse(file);

  const index = data.findIndex((x: ITask) => x.id === id);
  data.splice(index, 1);

  await fs.writeFile(
    process.cwd() + "/src/data/tasks.json",
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

  const file = await fs.readFile(
    process.cwd() + "/src/data/tasks.json",
    "utf8"
  );
  const data = JSON.parse(file);

  const index = data.findIndex((x: ITask) => x.id === id);
  data.splice(index, 1, body);

  await fs.writeFile(
    process.cwd() + "/src/data/tasks.json",
    JSON.stringify(data, null, 2)
  );

  return NextResponse.json(body);
}
