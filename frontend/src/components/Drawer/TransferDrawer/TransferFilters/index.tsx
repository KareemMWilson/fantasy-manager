import { HStack, VStack } from "@chakra-ui/react";
import { FilterOption } from "./FilterOption";
import { FilterQuery } from "./FIlterQuery";
import React from "react";
import { QueryType } from "@/store/services/transfers.Service";

interface TransferFiltersProps {
  setWhichTransfers: (value: "MY" | "GLOBAL") => void;
  whichTransfers: "MY" | "GLOBAL";
  setSearchQuery: React.Dispatch<React.SetStateAction<QueryType>>;
  searchQuery: QueryType
}

export const TransferFilters: React.FC<TransferFiltersProps> = ({
  setWhichTransfers,
  whichTransfers,
  setSearchQuery,
  searchQuery
}) => {
  return (
    <>
      <VStack>
        <HStack
          display="flex"
          width="100%"
          height="4rem"
          alignItems="center"
          justifyContent="center"
        >
          <FilterOption
            isActive={whichTransfers === "MY"}
            label="My Transfers"
            onClick={() => setWhichTransfers("MY")}
          />
          <FilterOption
            isActive={whichTransfers === "GLOBAL"}
            label="Global Transfers"
            onClick={() => setWhichTransfers("GLOBAL")}
          />
        </HStack>
      </VStack>
      {whichTransfers === "GLOBAL" && <FilterQuery setSearchQuery={setSearchQuery} searchQuery={searchQuery} />}
    </  >
  );
};
