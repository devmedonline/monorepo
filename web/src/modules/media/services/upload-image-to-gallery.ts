import { fetchApi } from "@/shared/lib/fetch-api";
import { z } from "zod";

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
  const formData = new FormData();
  formData.append("file", image.file);

  const json = await fetchApi("/medias", {
    method: "POST",
    body: formData,
  });

  const parsedJson = z
    .object({ uuid: z.string(), url: z.string() })
    .safeParse(json.data);

  if (parsedJson.success === false) throw new Error("Resposta da API inválida");

  return {
    id: parsedJson.data.uuid,
    url: parsedJson.data.url,
    height: image.height,
    width: image.width,
    alt: image.alt,
  };
}
