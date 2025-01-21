import { VStack } from "@chakra-ui/react";
import { Player } from "@/store/services/team.Service";
import { PlayerCard } from "@/components/Cards/PlayerCard";
//

export const PlayersList = ({
  players,
}: {
  players: Player[] | undefined;
  isLoading: boolean;
  refetchPlayers?: () => void;
}) => {
  return (
    <VStack
      gap={5}
      overflowY="auto"
      height="44rem"
      borderRadius="1rem"
      scrollbarColor="bg.info"
      paddingBottom='15rem'
    >
      {players ? (
        players?.map((item: Player) => <PlayerCard key={item.id} player={item} />)
      ) : (
        <p>No Players found.</p>
      )}
    </VStack>
  );
};
