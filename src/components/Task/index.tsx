/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimeOutline, TrashOutline } from "react-ionicons";
import { TaskT } from "../../types";

interface TaskProps {
  task: TaskT;
  provided: any;
  onDelete?: (taskId: string, taskTitle: string) => void;
}

const Task = ({ task, provided, onDelete }: TaskProps) => {
  const { id, title, description, priority, deadline, image, alt, tags } = task;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (window.confirm(`Tem certeza que deseja excluir a tarefa "${title}"?`)) {
      onDelete?.(id, title);
    }
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="w-full cursor-grab bg-white flex flex-col justify-between gap-3 items-start shadow-sm rounded-xl px-3 py-4 relative transition-all duration-200 hover:shadow-md"
    >
      {onDelete && (
        <button
          onClick={handleDelete}
          className="
            absolute top-2 right-2 p-2 rounded-full 
            bg-red-100 text-red-500 
            hover:bg-red-500 hover:text-white 
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-red-300
          "
          title="Excluir tarefa"
          aria-label={`Excluir tarefa: ${title}`}
        >
          <TrashOutline width="14px" height="14px" />
        </button>
      )}

      {image && alt && (
        <img
          src={image}
          alt={alt}
          className="w-full h-[170px] rounded-lg object-cover"
        />
      )}

      <div className="flex items-center gap-2 flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={`${tag.title}-${index}`}
            className="px-[10px] py-[2px] text-[13px] font-medium rounded-md"
            style={{ backgroundColor: tag.bg, color: tag.text }}
          >
            {tag.title}
          </span>
        ))}
      </div>

      <div className="w-full flex items-start flex-col gap-1">
        <span className="text-[15.5px] font-medium text-[#555] leading-tight">
          {title}
        </span>
        <span className="text-[13.5px] text-gray-500 leading-relaxed">
          {description}
        </span>
      </div>

      <div className="w-full border border-dashed border-gray-200"></div>

      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-1">
          <TimeOutline color={"#666"} width="19px" height="19px" />
          <span className="text-[13px] text-gray-700 font-medium">
            {deadline} min
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-500 font-medium uppercase">
            {priority === "high"
              ? "Alta"
              : priority === "medium"
                ? "Média"
                : "Baixa"}
          </span>
          <div
            className={`w-[60px] rounded-full h-[5px] ${
              priority === "high"
                ? "bg-red-500"
                : priority === "medium"
                  ? "bg-orange-500"
                  : "bg-blue-500"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Task;
