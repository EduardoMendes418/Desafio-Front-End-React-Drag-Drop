/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { Board, saveBoardToStorage } from "../../data/board";
import { Columns } from "../../types";
import { onDragEnd } from "../../helpers/onDragEnd";
import { AddOutline } from "react-ionicons";
import AddModal from "../../components/Modals/AddModal";
import Task from "../../components/Task";
import { toast } from "react-toastify";

const Home = () => {
  const [colunas, setColunas] = useState<Columns>(Board);
  const [modalAberto, setModalAberto] = useState(false);
  const [colunaSelecionada, setColunaSelecionada] = useState("");

  useEffect(() => {
    saveBoardToStorage(colunas);
  }, [colunas]);

  const abrirModal = (colunaId: any) => {
    setColunaSelecionada(colunaId);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const adicionarTarefa = (dadosTarefa: any) => {
    const novoQuadro = { ...colunas };
    novoQuadro[colunaSelecionada].items.push(dadosTarefa);
    setColunas(novoQuadro);

    toast.success(`Tarefa "${dadosTarefa.title}" adicionada com sucesso! 🎉`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const excluirTarefa = (taskId: string, taskTitle: string) => {
    const novoQuadro = { ...colunas };
    let tarefaExcluida = false;

    Object.keys(novoQuadro).forEach((colunaId) => {
      const coluna = novoQuadro[colunaId];
      const index = coluna.items.findIndex((item: any) => item.id === taskId);

      if (index !== -1) {
        coluna.items.splice(index, 1);
        tarefaExcluida = true;
      }
    });

    if (tarefaExcluida) {
      setColunas(novoQuadro);
      toast.info(`Tarefa "${taskTitle}" excluída com sucesso! 🗑️`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <DragDropContext
        onDragEnd={(resultado: any) =>
          onDragEnd(resultado, colunas, setColunas)
        }
      >
        <div
          className="
            w-full 
            flex 
            flex-wrap 
            items-start 
            gap-4 
            px-4 
            pb-8 
            overflow-x-hidden
            justify-center
          "
        >
          {Object.entries(colunas).map(([colunaId, coluna]: any) => (
            <div
              key={colunaId}
              className="
                w-full 
                sm:w-[300px] 
                md:w-[290px] 
                flex 
                flex-col 
                gap-3 
                flex-shrink-0
              "
            >
              <Droppable droppableId={colunaId}>
                {(provided: any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col gap-3 items-center py-5"
                  >
                    <div className="flex items-center justify-center py-2 w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-sm md:text-base">
                      {coluna.name}
                    </div>

                    {coluna.items.map((tarefa: any, indice: any) => (
                      <Draggable
                        key={tarefa.id.toString()}
                        draggableId={tarefa.id.toString()}
                        index={indice}
                      >
                        {(provided: any) => (
                          <Task
                            provided={provided}
                            task={tarefa}
                            onDelete={excluirTarefa}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <div
                onClick={() => abrirModal(colunaId)}
                className="
                  flex 
                  cursor-pointer 
                  items-center 
                  justify-center 
                  gap-1 
                  py-2 
                  w-full 
                  bg-white 
                  rounded-lg 
                  shadow-sm 
                  text-[#555] 
                  font-medium 
                  text-sm 
                  md:text-base 
                  hover:bg-gray-50 
                  transition
                "
              >
                <AddOutline color={"#555"} />
                Adicionar Tarefa
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
      <AddModal
        isOpen={modalAberto}
        onClose={fecharModal}
        setOpen={setModalAberto}
        handleAddTask={adicionarTarefa}
      />
    </>
  );
};

export default Home;
