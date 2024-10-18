import { Card, Flex, Text, Button, Input } from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

import { TaskProps } from "@types";
import { useState } from "react";

const Task = ({
  individualTask,
  handleDeleteTask,
  handleEditTask,
}: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState(individualTask.task);
  const handleSaveEdit = () => {
    handleEditTask(individualTask._id, newTaskContent);
    setIsEditing(false);
  };
  return (
    <Card p="2rem" mb="0.5rem" variant="outline">
      <Flex alignItems="center">
        {isEditing ? (
          <Input
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
          />
        ) : individualTask.completed ? (
          <Text flexGrow="1" as="del">
            {individualTask.task}
          </Text>
        ) : (
          <Text flexGrow="1">{individualTask.task}</Text>
        )}
        <Flex>
          <Button
            ml="1rem"
            colorScheme="blue"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <EditIcon /> : "Edit"}
          </Button>
          {isEditing && (
            <Button ml="1rem" colorScheme="green" onClick={handleSaveEdit}>
              Save
            </Button>
          )}
          <Button
            ml="1rem"
            colorScheme="red"
            onClick={() => handleDeleteTask(individualTask._id)}
          >
            <DeleteIcon />
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Task;
