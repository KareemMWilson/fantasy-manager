import Button from "@/components/Button";
import { TeamButton } from "@/components/Button/TeamButton";
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
export const TeamDrawer = () => {
  return (
    <DrawerRoot placement='start'>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <TeamButton />
      </DrawerTrigger>
      <DrawerContent position='absolute' top={0} left={0} height='100vh' borderRightRadius='32px' bg='green.300'>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <p>
            content
          </p>
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
