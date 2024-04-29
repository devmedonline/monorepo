import { FileDropZone } from "@/modules/media/components/file-drop-zone";
import { createImageFileSchema } from "@/modules/media/lib/create-image-file-schema";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useToast } from "@/shared/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  layers: createImageFileSchema().optional(),
});

type ImageUploadFormValues = z.infer<typeof formSchema>;

type ImageInput = { file: File; height: number; width: number; alt: string };

type UploadImageResponse = {
  url: string;
  height: number;
  width: number;
  alt: string;
};

type LayeredImageUploadDialogTriggerProps = {
  uploadImage: (image: ImageInput) => Promise<UploadImageResponse>;
  onSuccessfulUpload: (data: UploadImageResponse) => void;
  onFailedUpload: (error: Error) => void;
  onSave: (data: Array<{ src: string; title: string }>) => void;
  children: React.ReactNode;
};

export function LayeredImageUploadDialogTrigger({
  children,
  onFailedUpload,
  onSuccessfulUpload,
  uploadImage,
}: LayeredImageUploadDialogTriggerProps) {
  const id = useId();

  const form = useForm<ImageUploadFormValues>({
    resolver: zodResolver(formSchema),
  });

  const { toast } = useToast();

  const listFormat = new Intl.ListFormat("pt-BR", {
    style: "long",
    type: "disjunction",
  });

  const imageDropzone = useDropzone({
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        fileRejections.forEach((fileRejection) => {
          toast({
            variant: "destructive",
            title: "Arquivo inválido: " + fileRejection.file.name,
            description: listFormat.format(
              fileRejection.errors.map((error) => error.message)
            ),
          });
        });
      } else {
        form.setValue("layers", acceptedFiles);
      }
    },
    validator: (file) => {
      const parsed = formSchema
        .pick({ layers: true })
        .safeParse({ layers: [file] });

      if (parsed.success) return null;

      const imageErrors = parsed.error.flatten().fieldErrors.layers ?? [];

      return {
        code: "invalid-file",
        message: listFormat.format(imageErrors.map((error) => error)),
      };
    },
  });

  const onSubmit = async (values: ImageUploadFormValues) => {
    try {
      if (!values.layers) throw new Error("Faça upload de uma imagem");

      const uploads = values.layers.map(async (file) => {
        const image = new Image();
        image.src = URL.createObjectURL(file);
        return uploadImage({
          file: file,
          height: image.height,
          width: image.width,
          alt: "empty",
        });
      });

      const data = await Promise.all(uploads);

      data.map((d) => onSuccessfulUpload(d));
    } catch (error) {
      onFailedUpload(
        error instanceof Error ? error : new Error("Unknown error")
      );
    }
  };

  const disabled = process.env.NEXT_PUBLIC_FLAG_DISABLE_IMAGE_UPLOAD === "true";

  return (
    <Dialog>
      <DialogTrigger asChild disabled={disabled}>
        {children}
      </DialogTrigger>
      {disabled ? (
        <DialogContent>
          <DialogHeader>Imagem</DialogHeader>
          <p className="text-center text-muted-foreground">
            O upload de imagens está desativado
          </p>
        </DialogContent>
      ) : (
        <DialogContent className="max-h-[90dvh]">
          <DialogHeader>Imagens em camadas</DialogHeader>
          <Form {...form}>
            <form
              encType="multipart/form-data"
              id={id}
              method="POST"
              className="w-full space-y-3"
              onSubmit={(e) => {
                e.stopPropagation();
                e.preventDefault();
                return form.handleSubmit(onSubmit)(e);
              }}
            >
              <ScrollArea className="h-96 max-w-full">
                <FormField
                  control={form.control}
                  name="layers.0"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="sr-only">Imagem</FormLabel>
                      <FormControl>
                        <FileDropZone dropzoneState={imageDropzone}>
                          <FileDropZone.Container>
                            <FileDropZone.Input {...field} />
                            <FileDropZone.Preview />
                            <FileDropZone.Button />
                          </FileDropZone.Container>
                        </FileDropZone>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </ScrollArea>

              <Button type="submit" className="w-full gap-2 items-center">
                Salvar
              </Button>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
}
