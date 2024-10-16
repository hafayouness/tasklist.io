import { Flex, Alert, AlertIcon } from "@chakra-ui/react";

function NoTasks() {
  return (
    <Flex>
      <Alert status="warning">
        <AlertIcon />
        pas de tâche pour le moment.
      </Alert>
    </Flex>
  );
}

export default NoTasks;
