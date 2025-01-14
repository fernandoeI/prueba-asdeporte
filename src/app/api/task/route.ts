import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const usersPath = path.join(process.cwd(), "/public/tasks.json");
    const file = fs.readFileSync(usersPath);
    const data = JSON.parse(file.toString());

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest) {
  const usersPath = path.join(process.cwd(), "/public/tasks.json");
  const file = fs.readFileSync(usersPath);
  const data = JSON.parse(file.toString());

  const body = await req.json();
  fs.writeFileSync(
    process.cwd() + "/public/tasks.json",
    JSON.stringify([...data, body], null, 2)
  );

  return NextResponse.json(body);
}
