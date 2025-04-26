import { Search, ChevronDown, SquarePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Task } from "@/types/task";
import { createActivity } from "@/services/createActivity";

const schema = yup.object().shape({
  title: yup.string().required("Adicione uma tarefa"),
  category: yup
    .string()
    .oneOf(["estudos", "trabalho", "pessoal"])
    .required("Selecione uma categoria"),
  
});

type todoListProps = {
  addTask: (task: Task) => void;
  numberTasks: number;
  search: string;
  setSearch: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
  setSortOrder: (value: "asc" | "desc") => void;
};

export const ToDoList = ({
  addTask,
  numberTasks,
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  setSortOrder,
}: todoListProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Task>({
    resolver: yupResolver(schema),
  });

  const submitData = async (data: Task) => {
    try {
      const newTask = await createActivity(data.title, data.category);

      if (!newTask) {
        throw new Error("Erro ao adicionar atividade");
      }

      addTask(newTask);
      reset();
    } catch (error) {
      console.error("Erro no submit:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      handleSubmit(submitData);
    }
  };

  return (
    <div className="bg-white w-[90%] mt-8 sm:w-[80%] md:w-[70%] lg:w-[45%] pb-10 mb-12 md:mb-16 mx-auto rounded-md">
      <h1 className="text-black text-3xl md:text-4xl font-bold text-center py-6">
        Lista de tarefas
      </h1>

      <div className="mx-4">
        <form
          onSubmit={handleSubmit(submitData)}
          onKeyDown={handleKeyDown}
          className=" mt-6 flex flex-col gap-1 mb-5"
        >
          <div className="flex justify-center">
            <input
              type="text"
              {...register("title")}
              className="border bg-slate-200 w-full pl-1 h-9 outline-none placeholder:text-gray-600/80"
              placeholder="Adicionar tarefa"
            />
            <button className="bg-green-400 px-2 py-1">
              <SquarePlus />
            </button>
          </div>
          <p className="text-xs text-red-600">{errors.title?.message}</p>
          <div className="flex border relative text-gray-500/60">
            <select
              {...register("category")}
              className="w-full h-8 pl-1 outline-none appearance-none text-gray-600/80"
            >
              <option value="" className="text-xs md:text-sm lg:text-base">
                Categoria
              </option>
              <option
                value="estudos"
                className="text-xs md:text-sm lg:text-base"
              >
                Estudos
              </option>
              <option
                value="trabalho"
                className="text-xs md:text-sm lg:text-base"
              >
                Trabalho
              </option>
              <option
                value="pessoal"
                className="text-xs md:text-sm lg:text-base"
              >
                Pessoal
              </option>
            </select>
            <ChevronDown className="mr-1 mt-1 absolute right-1 pointer-events-none stroke-black" />
          </div>
          <p className="text-xs text-red-600">{errors.category?.message}</p>
        </form>

        <div className="flex justify-center items-center relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-100 w-full outline-none pl-1 h-9 placeholder:text-gray-600/80"
            placeholder="Procurar tarefa..."
          />
          <button className="pointer-events-none">
            <Search className="absolute right-1 top-1 " />
          </button>
        </div>

        <div className="flex items-center justify-around py-9 md:py-12 border border-slate-200 mt-2">
          <div className="flex items-center relative">
            <label htmlFor="status" className="font-bold flex items-center ">
              Filtrar:
            </label>
            <select
              id="status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-7 w-20 bg-transparent font-normal appearance-none ml-1 "
            >
              <option value="todas" className="text-xs md:text-sm lg:text-base">
                Todas
              </option>
              <option value="feita" className="text-xs md:text-sm lg:text-base">
                Feitas
              </option>
              <option
                value="fazer"
                className="text-xs md:text-sm lg:text-base  "
              >
                Fazer
              </option>
            </select>
            <ChevronDown
              size={22}
              className="absolute right-2 pointer-events-none"
            />
          </div>

          <div className="hidden md:block">
            <p className="font-bold">
              Nº de tarefas: <span className="font-normal">{numberTasks}</span>
            </p>
          </div>

          <div className="">
            <button
              onClick={() => setSortOrder("asc")}
              className="bg-slate-200 shadow-sm font-bold mx-3 px-1 md:px-2"
            >
              A-z
            </button>
            <button
              onClick={() => setSortOrder("desc")}
              className="bg-slate-200 shadow-sm font-bold  px-1 md:px-2"
            >
              Z-a
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
