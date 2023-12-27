import { yolo } from "@/shared/lib/yolo";
import { ChangeEmailFormValues } from "../components/change-email-form/change-email-form";

type ChangeEmailResult = { message: string };

export async function changeEmail(params: ChangeEmailFormValues): Promise<ChangeEmailResult> {
  await yolo.delay();
  yolo.randomlyThrows();

  console.log("Enviando novo email:", params);

  return {
    message: "E-mail atualizado com sucesso!",
  };
}
