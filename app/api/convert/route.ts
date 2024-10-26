import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

const ACCEPTED_FORMATS = ["jpeg", "png", "svg", "jpg"];

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();

  const file = formData.get("file") as File;
  const format = file.name.split(".").pop();

  // validate format
  if (format && !ACCEPTED_FORMATS.includes(format))
    return NextResponse.json({ ok: false }, { status: 400 });

  const isJpg = format === "jpeg" || format === "jpg";
  const isPng = format === "png";

  let webpOptions = undefined;

  // set webp options based on format for optimal results
  if (isJpg) {
    webpOptions = { alphaQuality: 0 };
  } else if (isPng) {
    webpOptions = { alphaQuality: 95, effort: 6 };
  } else {
    webpOptions = {};
  }

  try {
    const fileBuffer = await file.arrayBuffer();
    const resultBuffer = await sharp(fileBuffer).webp(webpOptions).toBuffer();
    const base64Image = resultBuffer.toString("base64");
    return NextResponse.json({ result: base64Image }, { status: 200 });
  } catch (error) {
    console.log("POST ~ error:", error);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
};
