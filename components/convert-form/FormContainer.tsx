"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";

import ConvertForm from "./Form";

import { formSchema, FormSchema } from "@/utils/validation/form";
import { removeFileExtension } from "@/utils/removeFileName";
import {
  bytesToMegabytes,
  getFileSizeFromBase64,
} from "@/utils/file-handling/file-handling";
import { BiCheckCircle } from "react-icons/bi";

const FormContainer = () => {
  const [originalFileSize, setOriginalFileSize] = useState<number | undefined>(
    undefined
  );
  const [newFileSize, setNewFileSize] = useState<number | undefined>(undefined);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    setSuccess(false);
    setError(undefined);
    try {
      const formData = new FormData();
      const file = data.file[0] as File;
      const format = file.name.split(".").pop();

      setOriginalFileSize(file.size);

      formData.append("file", file);

      const breakpoints = data.breakpoints;

      if (breakpoints) {
        formData.append("breakpoints", JSON.stringify(breakpoints));
      }

      const {
        data: { result },
      }: AxiosResponse<{
        result: string | { object: string; breakpoint: string }[];
      }> = await axios.post("/api/convert", formData);

      if (Array.isArray(result)) {
        setSuccess(true);
        result.forEach((item) => {
          const link = document.createElement("a");
          link.href = `data:image/webp;base64,${item.object}`;
          link.download = `${removeFileExtension(file.name)}_${item.breakpoint}.webp`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
        reset();
        return;
      }

      setSuccess(true);
      setNewFileSize(getFileSizeFromBase64(result, `image/${format}`));

      // download generated file
      const link = document.createElement("a");
      link.href = `data:image/webp;base64,${result}`;
      link.download = `${removeFileExtension(file.name)}.webp`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      reset();
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <section className="max-w-lg mx-auto">
      <FormProvider {...form}>
        <ConvertForm onSubmit={handleSubmit(onSubmit)} error={error} />
        {success && (
          <p className="text-green-600 font-medium text-lg my-3">
            Image converted successfully!
          </p>
        )}
        {originalFileSize && newFileSize && (
          <p className="text-lg font-semibold mt-10 flex items-center gap-2 text-neutral-200">
            <BiCheckCircle
              width={20}
              height={20}
              className="text-green-600 text-2xl"
            />{" "}
            Your webp image is{" "}
            {bytesToMegabytes(originalFileSize) - bytesToMegabytes(newFileSize)}{" "}
            MB smaller!
          </p>
        )}
      </FormProvider>
    </section>
  );
};

export default FormContainer;
