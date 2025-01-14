import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const file = await fs.readFile(
      process.cwd() + "/public/tasks.json",
      "utf8"
    );
    const data = JSON.parse(file);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest) {
  const file = await fs.readFile(process.cwd() + "/public/tasks.json", "utf8");
  const data = JSON.parse(file);

  const body = await req.json();
  await fs.writeFile(
    process.cwd() + "/public/tasks.json",
    JSON.stringify([...data, body], null, 2)
  );

  return NextResponse.json(body);
}
