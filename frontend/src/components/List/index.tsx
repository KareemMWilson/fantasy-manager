import { Spinner, VStack } from "@chakra-ui/react";
import { TransferCard } from "../Card";
import { Transfer } from "@/store/services/transfers.Service";

export const List = ({
  data,
  isLoading,
  mineTransfer,
}: {
  data: Transfer[] | undefined;
  isLoading: boolean;
  mineTransfer?: boolean
}) => {
  return (
    <VStack gap={5} marginTop='5rem'>
      {isLoading && !data ? (
        <Spinner
          width="10rem"
          height="10rem"
          color="primary.900"
          borderWidth="6px"
          marginTop='10rem'
        />
      ) : data ? (
        data.map((transfer: Transfer) => (
          <TransferCard
            key={transfer.id}
            title={transfer.player.name}
            subtitleLabel="Seller: "
            subtitleInfo={transfer.seller.name || transfer.seller.user.email}
            askingPrice={transfer.askingPrice}
            buttonText={mineTransfer ? 'Cancel Transfer' : 'Buy'}
            mineTransfer={mineTransfer}
          />
        ))
      ) : (
        <p>No transfers found.</p>
      )}
    </VStack>
  );
};
