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
import { useEffect, useMemo, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { TransferFilters } from "./TransferFilters";
import {
  QueryType,
  useGetGlobalTransfersQuery,
} from "@/store/services/transfers.Service";
import { TransferList, Transfers } from "@/components/List/TransferList";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { doneRefetching } from "@/store/slices/refetchSlice";

export const defaultSearchQuery: QueryType = {
  playerName: "",
  teamName: "",
  priceRange: [0, 2000000],
};

export const TransferDrawer = () => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [whichTransfers, setWhichTransfers] = useState<Transfers>("MY");
  const [searchQuery, setSearchQuery] = useState<QueryType>(defaultSearchQuery);
  const dispatch = useAppDispatch()
  const memoizedSearchQuery = useMemo(() => searchQuery, [searchQuery]);
  const {
    refetch: refetchingAllTransfers,
    data: globalTransfers,
    isLoading: globalTransfersIsLoading,
  } = useGetGlobalTransfersQuery(memoizedSearchQuery);

  const { refetchAllData, transfers } = useAppSelector(
    (state: RootState) => state.refetchSlice
  );

  useEffect(() => {
    if (refetchAllData || transfers) {
      refetchingAllTransfers();
      dispatch(doneRefetching())

    }
  }, [refetchAllData, transfers]);

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
        <DrawerBody overflowY="hidden">
          {/**filters */}
          <TransferFilters
            whichTransfers={whichTransfers}
            setWhichTransfers={setWhichTransfers}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />

          {/**Lists */}
          <TransferList
            data={globalTransfers?.data}
            isLoading={globalTransfersIsLoading}
            whichTransfer={whichTransfers}
          />
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
