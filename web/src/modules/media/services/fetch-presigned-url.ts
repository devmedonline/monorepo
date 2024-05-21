import { fetchApi } from "@/shared/lib/fetch-api";
import { computeSHA256 } from "../lib/compute-hash";

type PresignedUrlData = {
  url: string;
  key: string;
};

export async function fetchPresignedUrl(file: File): Promise<PresignedUrlData> {
  const response = await fetchApi<PresignedUrlData>(
    "/file-upload/presigned-url",
    {
      method: "POST",
      body: JSON.stringify({
        fileType: file.type,
        fileSize: file.size,
        checksum: await computeSHA256(file),
        filename: file.name,
      }),
    }
  );

  return response.data;
}
