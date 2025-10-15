import { useCallback } from "react";

import {
  addTask,
  deleteTask,
  updateColumns,
} from "../store/board/slices/boardSlice";
import { TaskT, Columns } from "../types";
import { useAppDispatch, useAppSelector } from "../store/board/slices";

export const useBoard = () => {
  const dispatch = useAppDispatch();
  const { columns } = useAppSelector((state) => state.board);

  const handleAddTask = useCallback(
    (columnId: string, task: TaskT) => {
      if (!columns[columnId]) {
        console.error(`Coluna ${columnId} não encontrada`);
        return;
      }

      dispatch(addTask({ columnId, task }));
    },
    [dispatch, columns],
  );

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      dispatch(deleteTask({ taskId }));
    },
    [dispatch],
  );

  const handleUpdateColumns = useCallback(
    (newColumns: Columns) => {
      dispatch(updateColumns(newColumns));
    },
    [dispatch],
  );

  return {
    columns,
    handleAddTask,
    handleDeleteTask,
    handleUpdateColumns,
  };
};
