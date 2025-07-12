import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";
import { parse } from "cookie";

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

// type Context = {
//   params: {
//     id: string;
//   };
// };

// export async function DELETE(request: NextRequest, { params }: Context) {
//   const { id } = params;
//   const cookieStore = await cookies();

//   try {
//     const { data } = await api.delete(`/notes/${id}`, {
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     });

//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     console.error("Failed to delete note:", error);
//     return NextResponse.json(
//       { error: "Failed to delete note" },
//       { status: 500 }
//     );
//   }
// }
