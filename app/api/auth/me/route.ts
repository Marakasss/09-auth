import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { api } from "../../api";

export async function GET() {
  const cookieStore = await cookies();

  try {
    const { data } = await api.get("/users/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (data) {
      return NextResponse.json(data);
    }
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
