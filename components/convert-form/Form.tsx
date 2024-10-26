"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import { FormSchema } from "@/utils/validation/form";

interface Props {
  onSubmit: () => void;
  error?: string;
}
const Form = ({ onSubmit, error }: Props) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<FormSchema>();

  return (
    <form
      className="text-gray-50 w-full flex flex-col gap-y-5"
      onSubmit={onSubmit}
    >
      <input
        type="file"
        {...register("file", { required: true })}
        accept="image/png, image/jpeg, image/svg, image/webp, image/avif, image/jpg"
        className="block"
      />
      {errors.file && (
        <p className="text-red-400">{errors.file?.message as string}</p>
      )}
      {error && <p className="text-red-400">{error}</p>}
      <div className="w-full">
        <button
          type="submit"
          className="block px-3 py-2 border border-gray-50 rounded-md w-full mb-2 hover:bg-gray-50 hover:text-gray-800 hover:border-gray-800 transition disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:text-gray-800 disabled:border-gray-800 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          Submit
        </button>
        <small className="italic text-sm">Size limit: 10mb</small>
      </div>
    </form>
  );
};

export default Form;
