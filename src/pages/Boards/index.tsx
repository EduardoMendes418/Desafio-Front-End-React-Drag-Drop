import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useState } from "react";
import { AddOutline } from "react-ionicons";
import AddModal from "../../components/Modals/AddModal";
import Task from "../../components/Task";
import { toast } from "react-toastify";
import { useBoard } from "../../hooks/useBoard";
import { onDragEnd } from "../../helpers/onDragEnd";
import { TaskT, Column } from "../../types";

const Home = () => {
  const { columns, handleAddTask, handleDeleteTask, handleUpdateColumns } =
    useBoard();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");

  const openModal = (columnId: string) => {
    setSelectedColumn(columnId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedColumn("");
  };

  const handleAddTaskSubmit = (taskData: any) => {
    const newTask: TaskT = {
      id: taskData.id,
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      deadline: taskData.deadline,
      image: taskData.image,
      alt: taskData.alt,
      tags: taskData.tags,
    };

    handleAddTask(selectedColumn, newTask);
    toast.success(`Tarefa "${taskData.title}" adicionada com sucesso! 🎉`);
  };

  const handleDeleteTaskConfirm = (taskId: string, taskTitle: string) => {
    handleDeleteTask(taskId);
    toast.info(`Tarefa "${taskTitle}" excluída com sucesso! 🗑️`);
  };

  const handleDragEnd = (result: DropResult) => {
    onDragEnd(result, columns, handleUpdateColumns);
  };

  const columnEntries = Object.entries(columns) as [string, Column][];

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="w-full flex flex-wrap items-start gap-4 px-4 pb-8 justify-center">
          {columnEntries.map(([columnId, column]) => (
            <div
              key={columnId}
              className="w-full sm:w-[300px] md:w-[290px] flex flex-col gap-3 flex-shrink-0"
            >
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col gap-3 items-center py-5"
                  >
                    <div className="flex items-center justify-center py-2 w-full bg-white rounded-lg shadow-sm text-gray-600 font-medium text-sm md:text-base">
                      {column.name}
                    </div>

                    {column.items.map((task: TaskT, index: number) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <Task
                            provided={provided}
                            task={task}
                            onDelete={handleDeleteTaskConfirm}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <button
                onClick={() => openModal(columnId)}
                className="flex items-center justify-center gap-2 py-3 w-full bg-white rounded-lg shadow-sm text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
              >
                <AddOutline color={"#6b7280"} />
                Adicionar Tarefa
              </button>
            </div>
          ))}
        </div>
      </DragDropContext>

      <AddModal
        isOpen={isModalOpen}
        onClose={closeModal}
        setOpen={setIsModalOpen}
        handleAddTask={handleAddTaskSubmit}
      />
    </>
  );
};

export default Home;
