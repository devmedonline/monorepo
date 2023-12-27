/**
 * Aguarda um tempo antes de resolver a promise.
 * @param ms Tempo em milissegundos para aguardar antes de resolver a promise.
 * @returns Uma promise que resolve após o tempo especificado.
 */
const delay = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Lança um erro aleatoriamente.
 * @param chance Chance de erro, entre 0 e 1. 0 = 0%, 1 = 100%
 */
const randomlyThrows = (chance = 0.7) => {
  if (Math.random() < chance) throw new Error("Algo deu errado!");
};

/**
 * Uma série de utilidades para criar efeitos colaterais em funções para testes e demonstrações.
 */
export const yolo = { delay, randomlyThrows };
