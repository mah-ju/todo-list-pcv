"use client";
import { ToDoList } from "./components/ToDoList";
import { CardTask } from "./components/CardTask";
import { Task } from "@/types/task";
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todas");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const handleToggleCheck = (id: string) => {
    console.log("toggle checked");
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const updateTask = (id: string, updateTitle: string) => {
    console.log("editou");
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: updateTitle } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTask = tasks
    .filter((task) =>
      task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    .filter((task) => {
      if (filterStatus === "todas") return true;
      if (filterStatus === "feitas") return task.checked;
      if (filterStatus === "fazer") return !task.checked;
      return true;
    })

    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

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
          toggleCheck={handleToggleCheck}
        />
      ))}
    </div>
  );
}
