import { NextResponse } from "next/server";
import { deleteTodo } from "@/lib/todos";

type Props = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_: Request, { params }: Props) {
  const { id } = await params;
  const deleted = deleteTodo(Number(id));

  if (!deleted) {
    return NextResponse.json(
      { error: "Todo not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Deleted successfully." });
}