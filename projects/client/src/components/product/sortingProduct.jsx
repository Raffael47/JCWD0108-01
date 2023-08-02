import React from "react";
import { Box, Switch } from "@chakra-ui/react";

export const SortingProduct = ({ handleSort, sortOption }) => {

  return (
    <Box spacing={6} align="stretch">
      <Switch
        size="md"
        colorScheme={sortOption === "az" ? "blue" : "gray"}
        onChange={() => handleSort("az")}
      >
        A-Z
      </Switch>
      <Switch
        size="md"
        colorScheme={sortOption === "za" ? "blue" : "gray"}
        onChange={() => handleSort("za")}
      >
        Z-A
      </Switch>
      <Switch
        size="md"
        colorScheme={sortOption === "highest" ? "blue" : "gray"}
        onChange={() => handleSort("highest")}
      >
        Highest
      </Switch>
      <Switch
        size="md"
        colorScheme={sortOption === "lowest" ? "blue" : "gray"}
        onChange={() => handleSort("lowest")}
      >
        Lowest
      </Switch>
    </Box>
  );
};