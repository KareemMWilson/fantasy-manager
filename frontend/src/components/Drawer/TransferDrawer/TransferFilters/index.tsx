import { HStack, VStack } from "@chakra-ui/react";
import { FilterOption } from "./FilterOption";


interface TransferFiltersProps {
    setWhichTransfers: (value: "MY" | "GLOBAL") => void;
    whichTransfers: "MY" | "GLOBAL";
  }

export const TransferFilters: React.FC<TransferFiltersProps>  = ({ setWhichTransfers, whichTransfers }) => {
    return (
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
    );
  };