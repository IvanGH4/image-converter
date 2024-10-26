/**
 * Converts bytes to megabytes.
 * @param {number} bytes - The number of bytes.
 * @return {number} The number of megabytes.
 */
export const bytesToMegabytes = (bytes: number): number => {
  const megabytes = bytes / (1024 * 1024);
  return parseFloat(megabytes.toFixed(2));
};

/**
 * Converts a base64 string to a Blob object.
 * @param {string} base64 - The base64 encoded string.
 * @param {string} mimeType - The MIME type of the file (e.g., "image/png").
 * @return {Blob} The resulting Blob object.
 */
const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

/**
 * Get the size of a file from a base64 string.
 * @param {string} base64 - The base64 encoded string.
 * @param {string} mimeType - The MIME type of the file (e.g., "image/png").
 * @return {number} The size of the file in bytes.
 */
export const getFileSizeFromBase64 = (
  base64: string,
  mimeType: string
): number => {
  const blob = base64ToBlob(base64, mimeType);
  return blob.size;
};
