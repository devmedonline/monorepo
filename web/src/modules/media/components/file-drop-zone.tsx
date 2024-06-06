"use client";

import { cn } from "@/shared/lib/utils";
import { ClassValue } from "clsx";
import {
  Ref,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { DropzoneState } from "react-dropzone";

type FileDropZoneContext = { dropzoneState: DropzoneState };
const FileDropZoneContext = createContext<FileDropZoneContext | null>(null);

type FileDropZoneProps = {
  dropzoneState: DropzoneState;
  children: React.ReactNode;
};
function FileDropZone({ dropzoneState, children }: FileDropZoneProps) {
  return (
    <FileDropZoneContext.Provider value={{ dropzoneState }}>
      {children}
    </FileDropZoneContext.Provider>
  );
}

const useFileDropZone = () => {
  const context = useContext(FileDropZoneContext);

  if (!context) {
    throw new Error("useFileDropZone deve ser usado dentro de um FileDropZone");
  }

  return context;
};

type FileDropZoneContainerProps = {
  children: React.ReactNode;
  className?: ClassValue;
};
function FileDropZoneContainer({
  children,
  className,
}: FileDropZoneContainerProps) {
  const { dropzoneState } = useFileDropZone();

  return (
    <div
      {...dropzoneState.getRootProps()}
      className={cn(
        "flex-1 flex flex-col h-fit justify-center items-center p-4 border rounded border-dashed cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

type FileDropZonePreviewProps = { className?: ClassValue };
function FileDropZonePreview({ className }: FileDropZonePreviewProps) {
  const { dropzoneState } = useFileDropZone();

  return dropzoneState.acceptedFiles.map((file, index) => (
    <FileDropZonePreviewAcceptedUnit
      key={index}
      file={file}
      className={className}
    />
  ));
}

function useImageFileData(file: File) {
  const [image, setImage] = useState({ width: 0, height: 0, src: "" });

  const fromBytesToKB = (bytes: number) => {
    return (bytes / 1024).toFixed(2) + " KB";
  };

  useEffect(() => {
    if (file.type.startsWith("image/")) {
      const image = new Image();

      const createImagePreviewURL = (file: File) => URL.createObjectURL(file);

      image.onload = () => {
        setImage({
          width: image.width,
          height: image.height,
          src: createImagePreviewURL(file),
        });
      };

      image.src = createImagePreviewURL(file);
    }
  }, [file]);

  return {
    width: image.width,
    height: image.height,
    src: image.src,
    size: fromBytesToKB(file.size),
  };
}

type FileDropZonePreviewAcceptedUnitProps = {
  file: File;
  className?: ClassValue;
};
function FileDropZonePreviewAcceptedUnit({
  file,
  className,
}: FileDropZonePreviewAcceptedUnitProps) {
  const image = useImageFileData(file);

  if (!image) {
    return null;
  }

  return (
    <div className={cn("w-full h-fit flex flex-col gap-1", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={file.name}
        className="w-full h-auto object-cover rounded min-h-[250px] bg-muted py-4 max-h-[30dvh]"
      />

      <div className="flex justify-start divide-x">
        <p className="py-1 px-2 text-sm bg-muted min-w-fit w-full text-muted-foreground text-center rounded-l">
          {image.height}px por {image.width}px
        </p>
        <p className="py-1 px-2 text-sm bg-muted min-w-fit w-full text-muted-foreground text-center rounded-r">
          {image.size}
        </p>
      </div>
      <p className="py-1 px-2 text-sm bg-muted min-w-fit w-full text-muted-foreground text-center">
        {file.type}
      </p>
      <p className="py-1 text-sm  bg-muted text-muted-foreground truncate px-2 rounded ">
        {file.name}
      </p>
    </div>
  );
}

type FileDropZoneButtonProps = { className?: ClassValue };
function FileDropZoneButton({ className }: FileDropZoneButtonProps) {
  const { dropzoneState } = useFileDropZone();

  if (dropzoneState.acceptedFiles.length > 0) {
    return null;
  }

  return (
    <button type="button" className={cn("w-full h-full", className)}>
      {dropzoneState.isDragActive ? (
        <p>Solte o arquivo aqui ...</p>
      ) : (
        <p>Arraste e solte o arquivo aqui, ou clique para selecionar</p>
      )}
    </button>
  );
}

type FileDropZoneInputProps = { className?: ClassValue };
function InnerFileDropZoneInput(
  { className }: FileDropZoneInputProps,
  ref: Ref<HTMLInputElement>
) {
  const { dropzoneState } = useFileDropZone();

  return (
    <input
      ref={ref}
      {...dropzoneState.getInputProps()}
      className={cn("w-full h-full block lg:hidden", className)}
    />
  );
}
const FileDropZoneInput = forwardRef(InnerFileDropZoneInput);
FileDropZoneInput.displayName = "FileDropZoneInput";

FileDropZone.Input = FileDropZoneInput;
FileDropZone.Container = FileDropZoneContainer;
FileDropZone.Preview = FileDropZonePreview;
FileDropZone.Button = FileDropZoneButton;

export { FileDropZone };
