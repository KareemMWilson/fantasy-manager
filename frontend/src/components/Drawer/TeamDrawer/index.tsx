import Button from "@/components/Button";
import { TeamButton } from "@/components/Button/TeamButton";
import { PlayersList } from "@/components/List/PlayersList";
import { Player } from "@/store/services/team.Service";
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
  Spinner,
  Text,
} from "@chakra-ui/react";
import { BiXCircle } from "react-icons/bi";

export const TeamDrawer = ({
  players,
  isLoading,
  teamBudget,
}: {
  players: Player[] | undefined;
  isLoading: boolean;
  teamBudget: number | undefined;
}) => {
  return (
    <DrawerRoot placement="start">
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <TeamButton />
      </DrawerTrigger>
      <DrawerContent
        position="absolute"
        top="0rem"
        left="0rem"
        height="100vh"
        minWidth="37rem"
        borderRightRadius="32px"
        bg="green.300"
      >
        <DrawerHeader>
          <DrawerTitle color="primary.900" fontSize={20}>
            Your Team
          </DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          {!players ? (
            <Spinner h={20} w={20} color="primary.900" />
          ) : (
            <>
              <Text
                color="primary.800"
                alignSelf="flex-start"
                marginY={5}
                fontSize={17}
                fontFamily="mono"
                w='fit-content'
              >
                <span>Team Budget: </span>
                {teamBudget} $
              </Text>
              <Text
                color="primary.800"
                alignSelf="flex-start"
                marginY={5}
                fontSize={17}
                fontFamily="mono"
                w='fit-content'
              >
                <span>Team Members: </span>
                {players.length} Players
              </Text>
              <PlayersList players={players} isLoading={isLoading} />
            </>
          )}
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button variant="outline" iconRight={<BiXCircle />}></Button>
          </DrawerActionTrigger>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};
