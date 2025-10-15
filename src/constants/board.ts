import { Columns } from "../types";

export const initialBoard: Columns = {
  backlog: {
    name: "A Fazer",
    items: [],
  },
  pending: {
    name: "Em Progresso",
    items: [],
  },
  todo: {
    name: "Concluído",
    items: [],
  },
};

export const STORAGE_KEYS = {
  BOARD: 'kanban-board',
} as const;