import { Avatar } from "@/components/Avatar";
import Dialog from "@/components/Dialog";
import { TeamDrawer } from "@/components/Drawer/TeamDrawer";
import { TransferDrawer } from "@/components/Drawer/TransferDrawer";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
import { setIsNewUser } from "@/store/slices/authSlice";
import { HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { IoShirt } from "react-icons/io5";

const Home = () => {
  const [isNotificationOpen, setNotificationOpen] = useState<boolean>(true)
  const isNewUser = useAppSelector((state: RootState) => state.auth.isNewUser);
  const dispatch = useAppDispatch()


  const handleNotificationBudget = () => {
    setNotificationOpen(false)
    dispatch(setIsNewUser(false))
  }

  return (
    <>
    {/** Header */}
    <Avatar />
    {/** Notification Dialog */}
    {isNewUser && <Dialog
      isOpen={isNotificationOpen}
      onClose={handleNotificationBudget}
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
    <TeamDrawer />
    <TransferDrawer />
    </>

  );
};

export default Home;
