import {
  Avatar as ChakraAvatar,
  AvatarIcon,
  Collapsible,
  Box,
} from "@chakra-ui/react";
import Button from "../Button";
import { logout } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/hooks/redux";
import { useNavigate } from "react-router-dom";

export const Avatar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/auth')
  }
  return (
    <Collapsible.Root position="absolute" top={5} right={5} cursor="pointer" >
      <Collapsible.Trigger bg='none'>
        <ChakraAvatar.Root>
          <AvatarIcon />
        </ChakraAvatar.Root>
      </Collapsible.Trigger>
      <Collapsible.Content width='7rem' placeContent='flex-end'>
        <Box>
          <Button onClick={handleLogout}>Logout</Button>
        </Box>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
