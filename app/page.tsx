"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import { Flex, Spinner } from "@chakra-ui/react";
import { ITask } from "@types";
import NoTasks from "@components/NoTasks";
import Task from "@components/Task";
import Loading from "@components/Loading";
export default function Home() {
  const [task, setTask] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [allTasks, setAllTasks] = useState([]);
  const handleCreateTask = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/task/new", {
        method: "POST",
        body: JSON.stringify({
          task: task,
        }),
      });
      if (res.ok) {
        setTask("");
        fetchAllTasks();
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  const fetchAllTasks = async () => {
    try {
      const res = await fetch("/api/task/all");
      const data = await res.json();
      setAllTasks(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleDeleteTask = async (id: string) => {
    try {
      setIsLoading(true);

      const res = await fetch(`/api/task/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.log("Error deleting task:", errorData.message);
        setIsLoading(false);
        return;
      }

      setAllTasks((prevTasks) =>
        prevTasks.filter((task: ITask) => task._id !== id)
      );
      console.log("Task deleted successfully");
    } catch (error) {
      console.log("Error occurred while deleting task:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleEditTask = async (id: string, updatedTask: string) => {
    try {
      const res = await fetch(`/api/task/edit/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          task: updatedTask,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        await fetchAllTasks();
      } else {
        console.log("Error updating task");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <>
      <Header />
      <AddTask
        task={task}
        setTask={setTask}
        handleCreateTask={handleCreateTask}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Flex direction="column" p="2rem">
            {allTasks.length > 0 ? (
              allTasks.map((individualTask: ITask) => (
                <Task
                  key={individualTask._id}
                  individualTask={individualTask}
                  handleDeleteTask={handleDeleteTask}
                  handleEditTask={handleEditTask}
                />
              ))
            ) : (
              <NoTasks />
            )}
          </Flex>
        </>
      )}
    </>
  );
}
