"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";

import Form from "./Form";

import { formSchema, FormSchema } from "@/utils/validation/form";
import { removeFileExtension } from "@/utils/removeFileName";

const FormContainer = () => {
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      const formData = new FormData();
      const file = data.file[0] as File;
      formData.append("file", file);
      const result: AxiosResponse<{ result: string }> = await axios.post(
        "/api/convert",
        formData
      );

      // download generated file
      const link = document.createElement("a");
      link.href = `data:image/webp;base64,${result.data.result}`;
      link.download = `${removeFileExtension(file.name)}.webp`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <FormProvider {...form}>
      <Form onSubmit={handleSubmit(onSubmit)} error={error} />
    </FormProvider>
  );
};

export default FormContainer;
