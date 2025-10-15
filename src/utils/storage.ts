import { Columns } from "../types";
import { initialBoard, STORAGE_KEYS } from "../constants/board";

export const loadBoardFromStorage = (): Columns => {
  try {
    const savedBoard = localStorage.getItem(STORAGE_KEYS.BOARD);
    if (savedBoard) {
      return JSON.parse(savedBoard);
    }
  } catch (error) {
    console.error("Erro ao carregar do localStorage:", error);
  }

  localStorage.setItem(STORAGE_KEYS.BOARD, JSON.stringify(initialBoard));
  return initialBoard;
};

export const saveBoardToStorage = (board: Columns): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.BOARD, JSON.stringify(board));
  } catch (error) {
    console.error("Erro ao salvar no localStorage:", error);
  }
};
