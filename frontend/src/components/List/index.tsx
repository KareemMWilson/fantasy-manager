import { Spinner, VStack } from "@chakra-ui/react";
import { TransferCard } from "../Cards/TransferCard";
import { Transfer } from "@/store/services/transfers.Service";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
// 


export type Transfers = "GLOBAL" | "MY";

export const List = ({
  data,
  isLoading,
  whichTransfer,
  refetchTransfers,
  playerCard,
}: {
  data: Transfer[] | undefined;
  isLoading: boolean;
  whichTransfer?: Transfers;
  refetchTransfers?: () => void;
  playerCard?: boolean;
}) => {
  const userId = useAppSelector((state: RootState) => state.auth.user?.id);
  const manibulatedData = whichTransfer === "MY" ? data?.filter((item) => item.seller.user.id === userId) : data;

  return (
    <VStack gap={5} marginTop="5rem">
      {isLoading && !manibulatedData ? (
        <Spinner
          width="10rem"
          height="10rem"
          color="primary.900"
          borderWidth="6px"
          marginTop="10rem"
        />
      ) : data ? (
        manibulatedData?.map(
          (item: Transfer) =>
            playerCard ? (
              <></>
            ) : (
              <TransferCard
                key={item.id}
                transfer={item}
                mineTransfer={item.seller.user.id === userId}
                refetchTransfers={refetchTransfers!}
              />
            )
        )
      ) : (
        <p>No transfers found.</p>
      )}
    </VStack>
  );
};
