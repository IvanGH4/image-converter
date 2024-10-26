import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();

  const file = formData.get("file") as File;

  try {
    const fileBuffer = await file.arrayBuffer();
    const resultBuffer = await sharp(fileBuffer).webp().toBuffer();
    const base64Image = resultBuffer.toString("base64");
    return NextResponse.json({ result: base64Image }, { status: 200 });
  } catch (error) {
    console.log("POST ~ error:", error);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
};
