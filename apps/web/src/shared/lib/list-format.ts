type ListFormatOptions = {
  style: "long" | "short" | "narrow";
  type: "conjunction" | "disjunction" | "unit";
};

const DEFAULT_LIST_FORMAT_OPTIONS: ListFormatOptions = {
  style: "long",
  type: "conjunction",
};

/**
 * Formata uma lista de strings de acordo com a linguagem e opções especificadas. Por padrão, usa o português brasileiro e formata como uma lista de itens.
 * @param list Lista de strings a ser formatada
 * @param lang Linguagem a ser usada na formatação
 * @param listFormatOptions Opções de formatação
 * @returns Lista formatada
 */
export function listFormat(list: Iterable<string>, lang = "pt-BR", listFormatOptions = DEFAULT_LIST_FORMAT_OPTIONS) {
  const intl = new Intl.ListFormat(lang, listFormatOptions);
  return intl.format(list);
}
