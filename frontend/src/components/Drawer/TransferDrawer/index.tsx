import Button from "@/components/Button";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { TransferFilters } from "./TransferFilters";
import {
  QueryType,
  useGetGlobalTransfersQuery,
  useGetUserTransfersQuery,
} from "@/store/services/transfers.Service";
import { List } from "@/components/List";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";

type Transfers = "GLOBAL" | "MY";

export const defaultSearchQuery: QueryType = {
  playerName: "",
  teamName: "",
  priceRange: [0, 2000000],
};

export const TransferDrawer = () => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [whichTransfers, setWhichTransfers] = useState<Transfers>("MY");
  const [searchQuery, setSearchQuery] = useState<QueryType>(defaultSearchQuery);
  const userId = useAppSelector((state: RootState) => state.auth.user?.id);

  const memoizedSearchQuery = useMemo(() => searchQuery, [searchQuery]);
  const { data: globalTransfers, isLoading: globalTransfersIsLoading } =
    useGetGlobalTransfersQuery(memoizedSearchQuery);

  const { data: userTransfers, isLoading: userTransfersIsLoading } =
    useGetUserTransfersQuery(userId ?? "");
  
    return (
    <DrawerRoot placement="end">
      <DrawerBackdrop />
      <DrawerTrigger asChild position="absolute" right="5rem" bottom="3rem">
        <FaExchangeAlt
          size={90}
          cursor="pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          color={hovered ? "green" : "white"}
        />
      </DrawerTrigger>
      <DrawerContent
        position="absolute"
        top="0rem"
        right="0rem"
        height="100vh"
        minWidth="37rem"
        borderLeftRadius="32px"
        bg="green.300"
      >
        <DrawerHeader>
          <DrawerTitle color="primary.900">Transfers List</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          {/**filters */}
          <TransferFilters
            whichTransfers={whichTransfers}
            setWhichTransfers={setWhichTransfers}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />

          {/**Lists */}
          {whichTransfers === "MY" ? (
            <List data={userTransfers?.data} isLoading={userTransfersIsLoading} mineTransfer />
          ): (
            <List data={globalTransfers?.data} isLoading={globalTransfersIsLoading} />
          )}
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerActionTrigger>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};
