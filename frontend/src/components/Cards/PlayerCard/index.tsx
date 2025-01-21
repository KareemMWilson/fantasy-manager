import { Badge, Card as ChakraCard, Text, VStack } from "@chakra-ui/react";
import Button from "../../Button";
import { IoShirt } from "react-icons/io5";
import Dialog from "../../Dialog";
import { useState } from "react";
// import { toaster } from "../../Toaster";
import { Player } from "@/store/services/team.Service";
import { GiBuyCard, GiCancel } from "react-icons/gi";
import { SellPlayerContent } from "./sellPlayer";
// import { useGetUserTeamQuery } from "@/store/services/team.Service";

interface PlayerCardProps {
  player: Player;
  refetchPlayers?: () => void;
}

export const PlayerCard = ({ player }: PlayerCardProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { name: playerName, club, value } = player;
  const buttonActionText = player ? "Sell Player" : "Cancel Transfer";
  const buttonActionIcon = player ? <GiBuyCard /> : <GiCancel />;
  const content = (
    <SellPlayerContent
      player={player}
      refetch={() => console.log("refetched")}
    />
  );

  return (
    <>
      <Dialog isOpen={openDialog} onClose={() => setOpenDialog(false)}>
        <VStack>{content}</VStack>
      </Dialog>
      <ChakraCard.Root width="100%" height="fit-content" borderRadius="2rem">
        <ChakraCard.Body
          gap="2"
          flexDir="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <IoShirt size={70} />
          <VStack justifyContent="center" alignItems="center">
            <ChakraCard.Title mt="2">{playerName}</ChakraCard.Title>
            <ChakraCard.Description>
              Club:
              {club}
            </ChakraCard.Description>
          </VStack>
          <VStack>
            <Badge colorPalette="green">Player Value:</Badge>
            <Text color="primary.900" fontSize={20}>
              {value} $
            </Text>
          </VStack>
        </ChakraCard.Body>
        <ChakraCard.Footer justifyContent="flex-end">
          {player?.transfers?.length ? (
            <Badge colorPalette="red">Listed for sale</Badge>
          ) : (
            <Button
              onClick={() => setOpenDialog(true)}
              iconRight={buttonActionIcon}
            >
              {buttonActionText}
            </Button>
          )}
        </ChakraCard.Footer>
      </ChakraCard.Root>
    </>
  );
};
