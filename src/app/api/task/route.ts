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
        fs.writeFileSync(filePath, JSON.stringify(null, null, 2));
      } else {
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
