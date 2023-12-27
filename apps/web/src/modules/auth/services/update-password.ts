import { yolo } from "@/shared/lib/yolo";
import { type UpdatePasswordFormValues } from "../components/update-password-form/update-password-form";

type UpdatePasswordResult = { message: string };

export async function updatePassword(params: UpdatePasswordFormValues): Promise<UpdatePasswordResult> {
  await yolo.delay();
  yolo.randomlyThrows();

  console.log("Enviando nova senha:", params);

  return {
    message: "Senha atualizada com sucesso!",
  };
}
