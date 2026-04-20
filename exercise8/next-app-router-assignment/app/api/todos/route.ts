import { NextResponse } from "next/server";
import { addTodo, getTodos } from "@/lib/todos";

export async function GET() {
  return NextResponse.json(getTodos());
}

export async function POST(request: Request) {
  const body = await request.json();
  const text = body?.text;

  if (!text || typeof text !== "string") {
    return NextResponse.json(
      { error: "Text is required." },
      { status: 400 }
    );
  }

  const newTodo = addTodo(text);
  return NextResponse.json(newTodo, { status: 201 });
}