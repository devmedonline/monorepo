import { MediaPickerDialogTrigger } from "@/modules/media/components/media-picker-dialog-trigger";
import { TextEditor } from "@/modules/text-editor/components/text-editor";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { useUpdatePostForm } from "../hooks/use-update-post-form";
import { Post } from "../types/post";

export type UpdatePostFormProps = {
  onSuccess: () => void;
  defaultValues: Post;
};

export function UpdatePostForm({
  onSuccess,
  defaultValues,
}: UpdatePostFormProps) {
  const { form, onSubmit } = useUpdatePostForm({
    onSuccess,
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Publicação" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <TextEditor
                  content={field.value}
                  onChange={(content) => {
                    field.onChange(JSON.stringify(content));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnail"
          render={() => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <MediaPickerDialogTrigger
                  media={{ url: defaultValues.thumbnail }}
                  onPick={(media) => form.setValue("thumbnail", media.url)}
                >
                  <Button type="button">Selecionar thumbnail</Button>
                </MediaPickerDialogTrigger>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  );
}
