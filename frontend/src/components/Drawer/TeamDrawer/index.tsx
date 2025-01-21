import Button from "@/components/Button";
import { TeamButton } from "@/components/Button/TeamButton";
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
} from "@chakra-ui/react";

export const TeamDrawer = ({players}: { players: Player[] | undefined}) => {

  return (
    <DrawerRoot placement='start'>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <TeamButton />
      </DrawerTrigger>
      <DrawerContent position='absolute' top={0} left={0} height='100vh' borderRightRadius='32px' bg='green.300'>
        <DrawerHeader>
          <DrawerTitle color='primary.900' fontSize={20}>Your Team</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
         {!players ? <Spinner h={20} w={20} color='primary.900' /> : <>Players List</>}
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerActionTrigger>
          <Button>Transfer</Button>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};
