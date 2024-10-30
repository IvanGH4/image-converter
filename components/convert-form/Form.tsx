"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FormSchema } from "@/utils/validation/form";

interface Props {
  onSubmit: () => void;
  error?: string;
}
const ConvertForm = ({ onSubmit, error }: Props) => {
  const form = useFormContext<FormSchema>();
  const {
    control,
    formState: { errors, isSubmitting },
  } = form;

  const fileRef = form.register("file");

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <FormField
          control={control}
          name="file"
          render={() => (
            <FormItem>
              <FormLabel className="text-neutral-200">
                Upload an image
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  required
                  accept="image/png, image/jpeg, image/svg, image/webp, image/avif, image/jpg"
                  className="border-neutral-200"
                  {...fileRef}
                />
              </FormControl>
              {errors.file && (
                <FormMessage className="text-neutral-400">
                  {errors.file.message?.toString()}
                </FormMessage>
              )}
              {error && (
                <FormMessage className="text-neutral-400">{error}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="mt-4 w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ConvertForm;
