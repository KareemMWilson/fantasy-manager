import { Avatar } from "@/components/Avatar";
import Dialog from "@/components/Dialog";
import { Drawer } from "@/components/Drawer";
import { HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { IoShirt } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const Home = () => {
  const {state} = useLocation();
  const { isNewUser } = state || {}

  const [isNotificationOpen, setNotificationOpen] = useState<boolean>(true)

  return (
    <>
    {/** Header */}
    <Avatar />
    {/** Notification Dialog */}
    {isNewUser && <Dialog
      isOpen={isNotificationOpen}
      onClose={() => setNotificationOpen(false)}
      cancelButton={{
        text: 'Got it',
      }}
      title="Congratulations 🎉">
      <p>You get 5,000,000 as a budget, consume it carefully</p>
    </Dialog>}
    {/** Players on Map */}
    {/* <Spinner width='20rem' height='20rem' color='primary.900' borderWidth='6px' opacity='0.6' position='absolute' top='50%' left='50%' /> */}
    <HStack height="40rem" width="40vw">
      <VStack id='GOALKEEPER' height="25rem" alignItems='center' justifyContent='center'>
        <VStack style={{ fontSize: "2rem" }}><IoShirt size={60}/></VStack>
      </VStack>
      <VStack id='DEFENDER' height="25rem" width='10rem' alignItems='center' justifyContent='center' gap='4.5rem'>
        <VStack style={{ fontSize: "2rem" }} alignSelf='end'><IoShirt size={60}/></VStack>
        <VStack style={{ fontSize: "2rem" }}><IoShirt size={60}/></VStack>
        <VStack style={{ fontSize: "2rem" }}><IoShirt size={60}/></VStack>
        <VStack style={{ fontSize: "2rem" }}alignSelf='end'><IoShirt size={60}/></VStack>
      </VStack>
      <VStack id='MIDEFENDER' height="25rem" width='10rem' alignItems='center' justifyContent='center' gap='4.5rem'>
        <VStack style={{ fontSize: "2rem" }}><IoShirt size={60}/></VStack>
        <VStack style={{ fontSize: "2rem" }} alignSelf='end'><IoShirt size={60}/></VStack>
        <VStack style={{ fontSize: "2rem" }}><IoShirt size={60}/></VStack>
      </VStack>
      <VStack id='ATTACKERS' height="25rem" width='10rem' alignItems='center' justifyContent='center' gap='4.5rem'>
        <VStack style={{ fontSize: "2rem" }}><IoShirt size={60}/></VStack>
        <VStack style={{ fontSize: "2rem" }}alignSelf='end'><IoShirt size={60}/></VStack>
        <VStack style={{ fontSize: "2rem" }}><IoShirt size={60}/></VStack>
      </VStack>
    </HStack>
    <Drawer />
    </>

  );
};

export default Home;
