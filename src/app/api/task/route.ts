import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function GET(_req: NextRequest) {
  const file = await fs.readFile(
    process.cwd() + "/src/data/tasks.json",
    "utf8"
  );
  const data = JSON.parse(file);

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const file = await fs.readFile(
    process.cwd() + "/src/data/tasks.json",
    "utf8"
  );
  const data = JSON.parse(file);

  const body = await req.json();
  await fs.writeFile(
    process.cwd() + "/src/data/tasks.json",
    JSON.stringify([...data, body], null, 2)
  );

  return NextResponse.json(body);
}
