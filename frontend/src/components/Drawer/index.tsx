import Button from "@/components/Button";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@chakra-ui/react";
import { TeamButton } from "../TeamButton";
export const Drawer = () => {
  return (
    <DrawerRoot placement='start'>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <TeamButton />
      </DrawerTrigger>
      <DrawerContent position='absolute' top={0} left={0} height='100vh'>
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
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};
