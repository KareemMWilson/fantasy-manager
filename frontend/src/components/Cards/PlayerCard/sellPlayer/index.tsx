import Button from "@/components/Button";
import { toaster } from "@/components/Toaster";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
import { Player } from "@/store/services/team.Service";
import { useSellPlayerMutation } from "@/store/services/transfers.Service";
import { refetchAll } from "@/store/slices/refetchSlice";
import { Input, VStack, Text } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useState } from "react";

interface SellPlayerContentProps {
  player: Player
  setOpenDialog: Dispatch<SetStateAction<boolean>>
}

export const SellPlayerContent = ({
  player,
  setOpenDialog
}: SellPlayerContentProps) => {
  const userId = useAppSelector((state: RootState) => state.auth.user?.id);
  const dispatch = useAppDispatch()
  const [askingPrice, setAskingPrice] = useState<number>(player.value);
  const [sellPlayer] = useSellPlayerMutation();

  const handleAskingPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const askingPriceUserTyped = Number(e.target.value);
    setAskingPrice(askingPriceUserTyped);
  };

  const sell = async () => {
    if (userId) {
      try {
        const data = await sellPlayer({ sellerId: userId, playerId: player.id, askingPrice }).unwrap()
        console.log({data})
        toaster.success({
          title: 'Done',
          description: data.message as string || 'Successfully Creating new Transfer',
        })
        dispatch(refetchAll(true))
        setOpenDialog(false)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error)
        toaster.error({
          title: 'Opps',
          description: error?.data?.message || 'Something Went Wrong',
        })
      }
      
    }
  };

  return (
    <VStack gap={5}>
      <Text color="primary.900" fontSize={30} margin={5} fontFamily="monospace">
        {player.name}
      </Text>
      <Text alignSelf="flex-start" color="primary.700">
        <span style={{ fontWeight: 900 }}>Asking Price: </span>
        {askingPrice} $
      </Text>
      <Input
        fontSize={20}
        type="number"
        value={askingPrice}
        color="primary.600"
        onChange={handleAskingPriceChange}
      ></Input>
      <Text>
        <span>Note: </span>Your Player will be Listed in Transfers List until another Team buy it
      </Text>
      <Button alignSelf="flex-end" width={150} onClick={sell}>
        S e l l
      </Button>
    </VStack>
  );
};
