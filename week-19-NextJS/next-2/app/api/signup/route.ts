import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const client = new PrismaClient();

  await client.user.create({
    data: {
      username: data.username,
      password: data.password,
    },
  });

  return NextResponse.json({ msg: "You have signed up" });
}
