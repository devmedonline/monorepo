import { GeneralCategorySelector } from "@/modules/general-category/components/general-category-selector";
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
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { useCreatePostForm } from "../hooks/use-create-post-form";
import { PostPublicAvailable } from "../types/post";

export function CreatePostForm({ onSuccess }: { onSuccess?: () => void }) {
  const { form, onSubmit } = useCreatePostForm({ onSuccess });

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
          name="thumbnail"
          render={() => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl className="w-full">
                <MediaPickerDialogTrigger
                  media={{ url: form.getValues("thumbnail") }}
                  onPick={(media) => form.setValue("thumbnail", media.url)}
                  renderSelectedMedia={(media) => (
                    <div
                      className="flex justify-end space-x-2 h-36 rounded-lg bg-center bg-cover flex-col"
                      style={{ backgroundImage: `url(${media.url})` }}
                      title={media.description}
                    >
                      <p className="text-white text-sm p-2 bg-black bg-opacity-50 rounded-b-lg">
                        {media.description}
                      </p>
                    </div>
                  )}
                >
                  <Button type="button" className="w-full" variant="outline">
                    Selecionar thumbnail
                  </Button>
                </MediaPickerDialogTrigger>
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
          name="generalCategoryId"
          render={({ field }) => (
            <FormItem className="space-y-3 flex flex-col">
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <GeneralCategorySelector
                  value={field.value}
                  onChange={(category) => field.onChange(category.id)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="publicAvailable"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Estado de publicação</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row flex-wrap gap-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={PostPublicAvailable.Draft} />
                    </FormControl>
                    <FormLabel className="font-normal">Rascunho</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={PostPublicAvailable.Published} />
                    </FormControl>
                    <FormLabel className="font-normal">Publicado</FormLabel>
                  </FormItem>
                </RadioGroup>
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
