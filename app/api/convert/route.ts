import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

const ACCEPTED_FORMATS = ["jpeg", "png", "svg", "jpg"];

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();

  const file = formData.get("file") as File;
  const format = file.name.split(".").pop();

  const breakpointsData = formData.get("breakpoints") as string | undefined;
  let breakpoints: undefined | string[];

  if (breakpointsData) breakpoints = JSON.parse(breakpointsData);

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

    const { width, height } = await sharp(fileBuffer).metadata();

    if (breakpoints) {
      const results: Promise<{ object: Buffer; breakpoint: string }[]> =
        Promise.all(
          breakpoints.map(async (breakpoint) => {
            if (Number(width) > Number(breakpoint)) {
              const heightToResize = Math.round(
                Number(breakpoint) * (Number(height) / Number(width))
              );

              const resizedObject = await sharp(fileBuffer)
                .resize(Number(breakpoint), heightToResize)
                .webp(webpOptions)
                .toBuffer();

              return { object: resizedObject, breakpoint };
            } else {
              const resultBuffer = await sharp(fileBuffer)
                .webp(webpOptions)
                .toBuffer();
              return { object: resultBuffer, breakpoint };
            }
          })
        );

      const parsedResults = (await results).map((item) => ({
        object: item.object.toString("base64"),
        breakpoint: item.breakpoint,
      }));
      return NextResponse.json({ result: parsedResults }, { status: 200 });
    }

    const resultBuffer = await sharp(fileBuffer).webp(webpOptions).toBuffer();
    const base64Image = resultBuffer.toString("base64");
    return NextResponse.json({ result: base64Image }, { status: 200 });
  } catch (error) {
    console.log("POST ~ error:", error);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
};
