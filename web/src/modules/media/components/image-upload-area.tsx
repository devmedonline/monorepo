import { createImageFileSchema } from "@/modules/media/lib/create-image-file-schema";
import { uploadImageToGallery } from "@/modules/media/services/upload-image-to-gallery";
import { useToast } from "@/shared/components/ui/use-toast";
import { cn } from "@/shared/lib/utils";
import { useMutation } from "@tanstack/react-query";
import NextImage from "next/image";
import { useId } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

const imageSchema = createImageFileSchema();

type UploadImageResponse = {
  url: string;
  height: number;
  width: number;
  alt: string;
};

type ImageUploadAreaProps = {
  onSuccessfulUpload: (data: UploadImageResponse) => void;
  onFailedUpload: (error: Error) => void;
  defaultValue?: {
    src: string | undefined;
  };
};

export function ImageUploadArea({
  onFailedUpload,
  onSuccessfulUpload,
  defaultValue,
}: ImageUploadAreaProps) {
  const id = useId();

  const { toast } = useToast();

  const uploadImageToGalleryMutation = useMutation({
    mutationFn: async (images: File[]) => {
      const firstImage = Array.isArray(images) ? images[0] : null;

      if (!firstImage) throw new Error("Faça upload de uma imagem");

      // Usado para pegar a altura e largura da imagem
      const image = new Image();
      image.src = URL.createObjectURL(firstImage);

      return new Promise<UploadImageResponse>((resolve, reject) => {
        image.onload = async () => {
          const width = image.width;
          const height = image.height;

          try {
            const data = await uploadImageToGallery({
              file: firstImage,
              height: height,
              width: width,
              alt: "avatar",
            });

            resolve(data);
          } catch (error) {
            reject(error);
          }
        };
      });
    },
    onError: (error) => {
      onFailedUpload(
        error instanceof Error ? error : new Error("Erro desconhecido")
      );
    },
    onSuccess: (data, variables, context) => {
      onSuccessfulUpload(data);
    },
  });

  const onDropFiles = uploadImageToGalleryMutation.mutate;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length === 0) {
        return onDropFiles(acceptedFiles);
      }

      const listFormat = new Intl.ListFormat("pt-BR", {
        style: "long",
        type: "conjunction",
      });

      fileRejections.forEach((fileRejection) => {
        toast({
          variant: "destructive",
          title: "Arquivo inválido: " + fileRejection.file.name,
          description: listFormat.format(
            fileRejection.errors.map((error) => error.message)
          ),
        });
      });
    },
    validator: (file) => {
      const parsed = imageSchema.safeParse([file]);

      if (parsed.success) return null;

      return {
        code: "invalid-file",
        message: "Arquivo inválido",
      };
    },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "w-full h-80 bg-background transition-colors duration-200 ease-in-out cursor-pointer rounded flex items-center justify-center",
          "hover:border-accent/50 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
          "border relative"
        )}
      >
        <input className="peer" id={id} {...getInputProps()} />

        <div
          style={{ width: "calc(100% - 1rem)", height: "calc(100% - 1rem)" }}
          className={cn(
            "pointer-events-none rounded border-2 border-dashed border-gray-300 absolute",
            isDragActive &&
              "border-accent-foreground animate-pulse transition-all duration-1000 ease-in-out"
          )}
        />

        <div
          style={{ width: "calc(100% - 1rem)", height: "calc(100% - 1rem)" }}
          className="origin-center overflow-clip rounded"
        >
          {defaultValue && defaultValue.src ? (
            <NextImage
              src={defaultValue?.src}
              className={cn(
                defaultValue?.src &&
                  "h-full w-full object-contain transition-all duration-300 ease-in-out"
              )}
              alt="Imagem para upload"
              width={1800}
              height={640}
            />
          ) : (
            <p className="text-center text-secondary-foreground text-sm h-full flex justify-center items-center">
              Arraste e solte uma imagem aqui ou clique para adicionar uma
              imagem
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
