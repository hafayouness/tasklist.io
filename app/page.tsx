"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import { Flex, Spinner } from "@chakra-ui/react";
import { ITask } from "@types";
import NoTasks from "@components/NoTasks";
import Task from "@models/tasks";

export default function Home() {
  const [task, setTask] = useState("");
  const [isloading, setIsLoading] = useState(true);
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
  const handleCompleteTask = async()=>{

  }
  const handleDeleteTask = async()=>{

  }
  return (
    <>
      <Header />
      <AddTask
        task={task}
        setTask={setTask}
        handleCreateTask={handleCreateTask}
      />
      {isloading ? (
        <Spinner />
      ) : (
        <Flex direction="column" p="2rem">
          {allTasks.length > 0 ? (
            allTasks.map((individualTask: ITask) => (
              <Task key={individualTask._id} individualTask={individualTask} handleCompleteTask={handleCompleteTask} handleDeleteTask={handleDeleteTask}|>
            ))
          ) : (
            <NoTasks />
          )}
        </Flex>
      )}
    </>
  );
}
