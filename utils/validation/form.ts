import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/svg",
  "image/jpg",
];

export const formSchema = z.object({
  file: z
    .any()
    .refine((files) => files?.length >= 1, {
      message: "Please upload an image.",
    })
    .refine(
      (files) => files[0]?.size <= MAX_FILE_SIZE,
      `Image size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      `Only the following image types are allowed: ${ACCEPTED_IMAGE_TYPES.join(
        ", "
      )}.`
    ),
  breakpoints: z.array(z.string()).optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
