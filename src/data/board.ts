import { Columns } from "../types";

const initialBoard: Columns = {
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

export const loadBoardFromStorage = (): Columns => {
  try {
    const savedBoard = localStorage.getItem("kanban-board");
    if (savedBoard) {
      return JSON.parse(savedBoard);
    }
  } catch (error) {
    console.error("Erro ao carregar do localStorage:", error);
  }

  localStorage.setItem("kanban-board", JSON.stringify(initialBoard));
  return initialBoard;
};

export const saveBoardToStorage = (board: Columns): void => {
  try {
    localStorage.setItem("kanban-board", JSON.stringify(board));
  } catch (error) {
    console.error("Erro ao salvar no localStorage:", error);
  }
};

export const Board = loadBoardFromStorage();
