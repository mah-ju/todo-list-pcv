"use client";
import { ToDoList } from "./components/ToDoList";
import { CardTask } from "./components/CardTask";
import { Task } from "@/types/task";
import { useEffect, useState } from "react";
import { getActivities } from "@/services/getActivities";
import { updateActivity } from "@/services/updateActivity";
import { deleteActivity } from "@/services/deleteActivity";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todas");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
    console.log(tasks);
  };

  const updateTask = async (id: number, updateTitle: string) => {
    const updatedTask = await updateActivity(id, { title: updateTitle });

    if (updatedTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, title: updatedTask.title } : task
        )
      );
    } else {
      console.error("Erro ao atualizar atividade");
    }
  };

  const removeTask = async (id: number) => {
    const success = await deleteActivity(id);

    if (success) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } else {
      console.error("Erro ao deletar a atividade");
    }
  };

  const handleToggleCheck = async (
    id: number,
    activity_status: "fazer" | "feita"
  ) => {
    try {
      console.log("Antes da atualização:", activity_status);
      const updateStatus = activity_status === "fazer" ? "feita" : "fazer";
      const response = await fetch(`/api/activities/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activity_status: updateStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar status");
      }
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, activity_status: updateStatus } : task
        )
      );
      console.log("Depois da atualização:", updateStatus);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTask = tasks
    .filter((task) =>
      task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    .filter((task) => {
      if (filterStatus === "todas") return true;
      if (filterStatus === "feita") return task.activity_status === "feita";
      if (filterStatus === "fazer") return task.activity_status === "fazer";
      return true;
    })

    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  //GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const activities = await getActivities();
        setTasks(activities);
      } catch (error) {
        console.error("Erro ao buscar atividade:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <ToDoList
        addTask={addTask}
        numberTasks={filteredTask.length}
        search={search}
        setSearch={setSearch}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        setSortOrder={setSortOrder}
      />
      {filteredTask.map((task) => (
        <CardTask
          key={task.id}
          task={task}
          updateTask={updateTask}
          taskId={task.id!}
          removeTask={removeTask}
          toggleCheck={() => handleToggleCheck(task.id!, task.activity_status!)}
        />
      ))}
    </div>
  );
}
