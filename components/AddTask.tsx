import { Flex, Heading, Text, Input, Button } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { AddTaskProps } from "@types";

const AddTask = ({ task, setTask, handleCreateTask }: AddTaskProps) => {
  return (
    <Flex pt="2rem" pl="2rem" pr="2rem" pb="1rem">
      <Input
        placeholder="Nouvelle tâche..."
        size="lg"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ background: "#fff" }}
      />
      <Button
        style={{ background: "#339af0", marginLeft: "0.75rem" }}
        size="lg"
        onClick={() => handleCreateTask()}
      >
        <SmallAddIcon color="white" boxSize="2rem" />
      </Button>
    </Flex>
  );
};

export default AddTask;
