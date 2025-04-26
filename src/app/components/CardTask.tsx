import { Pencil, X, SquareCheckBig, Check } from "lucide-react";
import { Task } from "@/types/task";
import { useState } from "react";

type cardTaskProps = {
  task: Task;
  updateTask: (id: number, updatedTitle: string) => void;
  taskId: number;
  removeTask: (id: number) => void;
  toggleCheck: (id: number, activity_status: "fazer" | "feita") => void;

};

export const CardTask = ({
  task,
  updateTask,
  taskId,
  removeTask,
  toggleCheck,
}: cardTaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.title);

  const handleEdit = () => {
    console.log("is Editing");
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    updateTask(taskId, editedText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    removeTask(taskId);
  };

  return (
    <div
      className="bg-white w-[90%] mt-3  sm:w-[80%] md:w-[70%]
     lg:w-[45%] mx-auto rounded-md min-h-24 md:min-h-32 flex"
    >
      <div className="mx-4 flex items-center w-full">
        <div className="w-full">
          {isEditing ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="bg-gray-400/30 w-[93%] lg:w-[97%] outline-none pl-1 h-9 "
            />
          ) : (
            <>
              <h3
                className={`md:text-xl ${
                  task.activity_status === "feita" ? "line-through text-gray-500 italic" : ""
                }`}
              >
                {task.title}
              </h3>
              <p
                className={`text-sm md:text-base capitalize ${
                  task.activity_status === "feita" ? "line-through text-gray-500 italic" : ""
                }`}
              >
                ({task.category})
              </p>
            </>
          )}
        </div>
        <div className="flex gap-4 md:gap-8">
          <button
            onClick={() =>toggleCheck(task.id!, task.activity_status!)}
            className={`bg-green-400 rounded transition-opacity duration-200 ease-in-out ${
              isEditing ? "opacity-0" : "opacity-100"
            }`}
          >
            <SquareCheckBig className="w-5 h-5 xl:w-6 xl:h-6" />
          </button>

          {isEditing ? (
            <button onClick={handleSaveEdit}  className="bg-sky-300 rounded">
              <Check className="w-5 h-5 xl:w-6 xl:h-6" />
            </button>
          ) : (
            <button onClick={handleEdit} className="bg-purple-400 rounded">
              <Pencil className="w-5 h-5 xl:w-6 xl:h-6" />
            </button>
          )}

          <button onClick={handleDelete} className="bg-red-500 rounded">
            <X className="w-5 h-5 xl:w-6 xl:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
