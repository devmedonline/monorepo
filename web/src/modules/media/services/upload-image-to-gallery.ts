import { fetchApi } from "@/shared/lib/fetch-api";
import { fetchPresignedUrl } from "./fetch-presigned-url";

export type ImageInput = {
  file: File;
  height: number;
  width: number;
  alt: string;
};

export type UploadImageToGalleryResult = {
  id: string;
  url: string;
  height: number;
  width: number;
  alt: string;
};

export async function uploadImageToGallery(
  image: ImageInput
): Promise<UploadImageToGalleryResult> {
  const presignedUrl = await fetchPresignedUrl(image.file);

  const response = await fetch(presignedUrl.url, {
    method: "PUT",
    body: image.file,
    headers: {
      "Content-Type": image.file.type,
    },
  });

  if (!response.ok) throw new Error("Erro ao fazer upload da imagem");

  const json = await fetchApi<{ url: string; description: string }>(
    "/file-upload/save",
    {
      method: "POST",
      body: JSON.stringify({
        key: presignedUrl.key,
        description: image.alt,
      }),
    }
  );

  console.log({
    id: presignedUrl.key,
    url: json.data.url,
    height: image.height,
    width: image.width,
    alt: json.data.description,
  });

  return {
    id: presignedUrl.key,
    url: json.data.url,
    height: image.height,
    width: image.width,
    alt: json.data.description,
  };
}
