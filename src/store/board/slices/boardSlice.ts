import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadBoardFromStorage, saveBoardToStorage } from "../../../data/board";
import { Columns, TaskT } from "../../../types";

interface BoardState {
  columns: Columns;
  loading: boolean;
  error: string | null;
}

const initialState: BoardState = {
  columns: loadBoardFromStorage(),
  loading: false,
  error: null,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    updateColumns: (state, action: PayloadAction<Columns>) => {
      state.columns = action.payload;
      saveBoardToStorage(action.payload);
    },

    addTask: (
      state,
      action: PayloadAction<{ columnId: string; task: TaskT }>
    ) => {
      const { columnId, task } = action.payload;

      if (state.columns[columnId]) {
        state.columns[columnId].items.push(task);
        saveBoardToStorage(state.columns);
      }
    },

    deleteTask: (state, action: PayloadAction<{ taskId: string }>) => {
      const { taskId } = action.payload;

      Object.keys(state.columns).forEach((columnId) => {
        state.columns[columnId].items = state.columns[columnId].items.filter(
          (item) => item.id !== taskId
        );
      });

      saveBoardToStorage(state.columns);
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  updateColumns,
  addTask,
  deleteTask,
  setError,
} = boardSlice.actions;

export default boardSlice.reducer;