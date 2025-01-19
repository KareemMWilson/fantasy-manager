import { Spinner, VStack } from "@chakra-ui/react";
import { Card } from "../Card";
import { Transfer } from "@/store/services/transfers.Service";

export const List = ({
  data,
  isLoading,
}: {
  data: Transfer[] | undefined;
  isLoading: boolean;
}) => {
  return (
    <VStack gap={5}>
      {isLoading && !data ? (
        <Spinner size='xl' />
      ) : data ? (
        data.map((transfer: Transfer) => (
          <Card
            key={transfer.id}
            title={transfer.player.name}
            subtitleLabel="Seller: "
            subtitleInfo={transfer.seller.name || transfer.seller.user.email}
            askingPrice={transfer.askingPrice}
          />
        ))
      ) : (
        <p>No transfers found.</p>
      )}
    </VStack>
  );
};
