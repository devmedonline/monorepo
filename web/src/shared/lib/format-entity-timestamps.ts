import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

type EntityTimestamps = Partial<{
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt: string | Date | null;
}>;

export function formatEntityTimestamps<T extends EntityTimestamps>(
  entity: T
): string {
  const now = new Date();
  const toFriendlyDate = (date: Date | string) => {
    return formatDistance(new Date(date), now, {
      addSuffix: true,
      locale: ptBR,
    });
  };

  if (entity.deletedAt) {
    return `Deletado em ${toFriendlyDate(entity.deletedAt)}`;
  }

  if (entity.updatedAt && entity.updatedAt !== entity.createdAt) {
    return `Atualizado em ${toFriendlyDate(entity.updatedAt)}`;
  }

  if (entity.createdAt) {
    return `Criado em ${toFriendlyDate(entity.createdAt)}`;
  }

  return "Sem informações de data";
}
