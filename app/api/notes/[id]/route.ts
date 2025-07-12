import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: NoteDetailsProps) {
  const cookieStore = await cookies();
  const { id } = await params;
  const { data } = await api(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  if (data) {
    return NextResponse.json(data);
  }
  return NextResponse.json({ error: "Failed to fetch note" }, { status: 500 });
}

export async function DELETE(
  request: NextRequest,
  { params }: NoteDetailsProps
) {
  const cookieStore = await cookies();
  const { id } = await params;

  try {
    const { data } = await api.delete(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
    });

    if (data) {
      return NextResponse.json(data, { status: 201 });
    }
  } catch (error) {
    console.error("Error deleting note:", error);
  }

  return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
}

export async function PATCH(request: Request, { params }: NoteDetailsProps) {
  const cookieStore = await cookies();
  const { id } = await params;
  const body = await request.json();

  try {
    const { data } = await api.patch(`/notes/${id}`, body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    if (data) {
      return NextResponse.json(data);
    }
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
}
