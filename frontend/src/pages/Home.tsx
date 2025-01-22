import { Avatar } from "@/components/Avatar";
import Dialog from "@/components/Dialog";
import { TeamDrawer } from "@/components/Drawer/TeamDrawer";
import { TransferDrawer } from "@/components/Drawer/TransferDrawer";
import FootballFormation from "@/components/PlayersOnMap";
import { toaster } from "@/components/Toaster";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useNotifications } from "@/hooks/useNotification.hook";
import { RootState } from "@/store";
import { useLazyGetUserTeamQuery } from "@/store/services/team.Service";
import { setIsNewUser } from "@/store/slices/authSlice";
import { doneRefetching } from "@/store/slices/refetchSlice";
import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Home = () => {
  const [isNotificationOpen, setNotificationOpen] = useState<boolean>(true);
  const [teamCreated, setTeamCreated] = useState<boolean>(false);
  const isNewUser = useAppSelector((state: RootState) => state.auth.isNewUser);
  const userId = useAppSelector((state: RootState) => state.auth.user?.id);
  const { refetchAllData, team } = useAppSelector(
    (state: RootState) => state.refetchSlice
  );
  const dispatch = useAppDispatch();
  const { notification, socket } = useNotifications(userId, isNewUser);
  const [trigger, { data, isLoading: loadingPlayers }] =
    useLazyGetUserTeamQuery();

  useEffect(() => {
    if (teamCreated || !isNewUser || refetchAllData || team) {
      console.log("Getting Team");
      trigger();
      dispatch(doneRefetching());
    }
  }, [teamCreated, isNewUser, refetchAllData, team]);

  const handleNotificationBudget = () => {
    setNotificationOpen(false);
  };

  useEffect(() => {
    if (notification?.type === "success") {
      toaster.success({
        title: "Your Team",
        description: notification?.message,
      });
      setTeamCreated(true);
      dispatch(setIsNewUser(false));
      socket?.disconnect();
    } else if (notification?.type === "error") {
      toaster.success({
        title: "Oops",
        description: notification?.message,
      });
      socket?.disconnect();
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
      {!data ? (
        <Spinner
          width="20rem"
          height="20rem"
          color="primary.900"
          borderWidth="6px"
          opacity="0.6"
          position="absolute"
          top="50%"
          left="50%"
        />
      ) : (
        <FootballFormation />
      )}
      <TeamDrawer
        players={data?.data?.players}
        teamBudget={data?.data.budget}
        isLoading={loadingPlayers}
      />
      <TransferDrawer />
    </>
  );
};

export default Home;
