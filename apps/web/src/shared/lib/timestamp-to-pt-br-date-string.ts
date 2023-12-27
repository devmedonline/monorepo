export function timestampToPtBrDateString(timestamp: string) {
  const date = new Date(parseInt(timestamp) * 1000);

  const today = new Date();

  const isFromTheSameYear = date.getFullYear() === today.getFullYear();
  const isFromTheSameMonth = date.getMonth() === today.getMonth();
  const isFromTheSameDay = date.getDate() === today.getDate();
  const isFromYesterday = date.getDate() === today.getDate() - 1;

  // Verifica se mensagem é do mesmo mês
  if (isFromTheSameYear && isFromTheSameMonth) {
    const time = date.toLocaleTimeString("pt-BR", {
      hour: "numeric",
      minute: "numeric",
    });

    if (isFromTheSameDay) return time;
    if (isFromYesterday) return `Ontem, ${time}`;
  }

  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    minute: "numeric",
    hour: "numeric",
  });
}
