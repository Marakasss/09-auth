import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";
import { parse } from "cookie";
import { Context } from "vm";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (accessToken) {
    return NextResponse.json({ success: true });
  }

  if (refreshToken) {
    const apiRes = await api.get("auth/session", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed["Max-Age"]),
        };

        if (parsed.accessToken)
          cookieStore.set("accessToken", parsed.accessToken, options);
        if (parsed.refreshToken)
          cookieStore.set("refreshToken", parsed.refreshToken, options);
      }
      return NextResponse.json({ success: true });
    }
  }
  return NextResponse.json({ success: false });
}

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
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
    console.error("Error creating note:", error);
  }

  return NextResponse.json({ error: "Failed to create note" }, { status: 500 });
}
