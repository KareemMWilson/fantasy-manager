import { Spinner, VStack } from "@chakra-ui/react";
import { Player } from "@/store/services/team.Service";
import { PlayerCard } from "@/components/Cards/PlayerCard";
//

export const PlayersList = ({
  data,
  isLoading,
  refetchPlayers,
}: {
  data: Player[] | undefined;
  isLoading: boolean;
  refetchPlayers?: () => void;
}) => {
  const manibulatedData = data?.filter((item) => item)

  return (
    <VStack
      gap={5}
      overflowY="auto"
      height="47rem"
      borderRadius="1rem"
      scrollbarColor='bg.info'
    >
      {isLoading && !manibulatedData ? (
        <Spinner
          width="10rem"
          height="10rem"
          color="primary.900"
          borderWidth="6px"
          marginTop="10rem"
        />
      ) : data ? (
        manibulatedData?.map((item: Player) => (
          <PlayerCard
            key={item.id}
            player={item}
          />
        ))
      ) : (
        <p>No Players found.</p>
      )}
    </VStack>
  );
};
