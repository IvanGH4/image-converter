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
import { Checkbox } from "@/components/ui/checkbox";

import { FormSchema } from "@/utils/validation/form";
import { breakpoints } from "@/lib/breakpoints";

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
        <FormField
          control={control}
          name="breakpoint"
          render={() => (
            <FormItem className="mt-5">
              <FormLabel className="text-neutral-200">
                Select the breakpoints you would like the image to be optimized
                for (one image per breakpoint will be generated)
              </FormLabel>
              {breakpoints.map((item) => (
                <FormField
                  control={control}
                  name="breakpoint"
                  key={item}
                  render={({ field }) => (
                    <FormControl className="items-start flex space-x-2 py-1">
                      <div>
                        <Checkbox
                          id={item}
                          checked={field.value?.includes(item)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...(field.value ?? ""), item])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== item
                                  )
                                );
                          }}
                        />
                        <label
                          htmlFor={item}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {item}
                        </label>
                      </div>
                    </FormControl>
                  )}
                />
              ))}
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
