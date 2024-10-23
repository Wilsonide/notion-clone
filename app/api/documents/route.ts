import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const parentDocumentId = url.searchParams.get("parentDocumentId");
  console.log("my Query =========================: ", parentDocumentId);

  try {
    const session = await auth();
    const User = session?.user;

    const documents = await db.documents.findMany({
      where: {
        isArchived: false,
        userId: User?.id,
        parentId: parentDocumentId ?? undefined,
      },
    });
    console.log(
      "documents ================================================================= : " +
        documents,
    );
    return NextResponse.json(documents, { status: 200 });
  } catch (err) {
    return NextResponse.json({
      message: "something went wrong",
      err,
      status: 400,
    });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const User = session?.user;
    if (!User) return NextResponse.error();

    const body = await req.json();
    const { title, parentId } = body;

    const document = await db.documents.create({
      data: {
        title,
        isPublished: false,
        userId: User?.id,
        parentId: parentId,
      },
    });

    return NextResponse.json(document, { status: 200 });
  } catch (err) {
    return NextResponse.json({
      message: "something went wrong",
      err,
      status: 400,
    });
  }
}
