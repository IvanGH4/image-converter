export const removeFileExtension = (fileName: string) => {
  return fileName.replace(/\.[^/.]+$/, "");
};
