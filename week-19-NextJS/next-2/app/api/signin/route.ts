import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const client = new PrismaClient();

  const response = await client.user.findFirst({
    where: {
      username: data.username,
      password: data.password,
    },
    select: {
      username: true,
    },
  });

  return NextResponse.json({ response });
}
