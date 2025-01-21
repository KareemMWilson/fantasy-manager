import { Avatar } from "@/components/Avatar";
import Dialog from "@/components/Dialog";
import { TeamDrawer } from "@/components/Drawer/TeamDrawer";
import { TransferDrawer } from "@/components/Drawer/TransferDrawer";
import { toaster } from "@/components/Toaster";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useNotifications } from "@/hooks/useNotification.hook";
import { RootState } from "@/store";
import { useLazyGetUserTeamQuery } from "@/store/services/team.Service";
import { setIsNewUser } from "@/store/slices/authSlice";
import { HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoShirt } from "react-icons/io5";

const Home = () => {
  const [isNotificationOpen, setNotificationOpen] = useState<boolean>(true);
  const isNewUser = useAppSelector((state: RootState) => state.auth.isNewUser);
  const userId = useAppSelector((state: RootState) => state.auth.user?.id);
  const dispatch = useAppDispatch();
  const { notification, socket } = useNotifications(userId, isNewUser);
  const [teamCreated, setTeamCreated] = useState<boolean>(false);
  const [trigger, {data, isLoading: loadingPlayers}] = useLazyGetUserTeamQuery()

  useEffect(() => {
    if(teamCreated || !isNewUser){
      console.log('Getting Team')
      trigger()
    }
  }, [teamCreated, isNewUser])



  const handleNotificationBudget = () => {
    setNotificationOpen(false);
  };

  useEffect(() => {
    if(notification?.type === 'success'){
      toaster.success({
        title: 'Your Team',
        description: notification?.message
      })
      setTeamCreated(true)
      dispatch(setIsNewUser(false))
      socket?.disconnect()
    }else if(notification?.type === 'error'){
      toaster.success({
        title: 'Oops',
        description: notification?.message
      })
      socket?.disconnect()
    }
  }, [notification]);

  return (
    <>
      {/** Header */}
      <Avatar />
      {/** Notification Dialog */}
      {isNewUser && (
        <Dialog
          isOpen={isNotificationOpen}
          onClose={handleNotificationBudget}
          cancelButton={{
            text: "Got it",
          }}
          title="Congratulations 🎉"
        >
          <p>You get 5,000,000 as a budget, consume it carefully</p>
        </Dialog>
      )}
      {/** Players on Map */}
      {/* <Spinner width='20rem' height='20rem' color='primary.900' borderWidth='6px' opacity='0.6' position='absolute' top='50%' left='50%' /> */}
      <HStack height="40rem" width="40vw">
        <VStack
          id="GOALKEEPER"
          height="25rem"
          alignItems="center"
          justifyContent="center"
        >
          <VStack style={{ fontSize: "2rem" }}>
            <IoShirt size={60} />
          </VStack>
        </VStack>
        <VStack
          id="DEFENDER"
          height="25rem"
          width="10rem"
          alignItems="center"
          justifyContent="center"
          gap="4.5rem"
        >
          <VStack style={{ fontSize: "2rem" }} alignSelf="end">
            <IoShirt size={60} />
          </VStack>
          <VStack style={{ fontSize: "2rem" }}>
            <IoShirt size={60} />
          </VStack>
          <VStack style={{ fontSize: "2rem" }}>
            <IoShirt size={60} />
          </VStack>
          <VStack style={{ fontSize: "2rem" }} alignSelf="end">
            <IoShirt size={60} />
          </VStack>
        </VStack>
        <VStack
          id="MIDEFENDER"
          height="25rem"
          width="10rem"
          alignItems="center"
          justifyContent="center"
          gap="4.5rem"
        >
          <VStack style={{ fontSize: "2rem" }}>
            <IoShirt size={60} />
          </VStack>
          <VStack style={{ fontSize: "2rem" }} alignSelf="end">
            <IoShirt size={60} />
          </VStack>
          <VStack style={{ fontSize: "2rem" }}>
            <IoShirt size={60} />
          </VStack>
        </VStack>
        <VStack
          id="ATTACKERS"
          height="25rem"
          width="10rem"
          alignItems="center"
          justifyContent="center"
          gap="4.5rem"
        >
          <VStack style={{ fontSize: "2rem" }}>
            <IoShirt size={60} />
          </VStack>
          <VStack style={{ fontSize: "2rem" }} alignSelf="end">
            <IoShirt size={60} />
          </VStack>
          <VStack style={{ fontSize: "2rem" }}>
            <IoShirt size={60} />
          </VStack>
        </VStack>
      </HStack>
      <TeamDrawer players={data?.data?.players} teamBudget={data?.data.budget} isLoading={loadingPlayers}/>
      <TransferDrawer />
    </>
  );
};

export default Home;
