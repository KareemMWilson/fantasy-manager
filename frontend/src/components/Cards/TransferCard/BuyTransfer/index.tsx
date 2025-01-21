import Button from "@/components/Button";
import { toaster } from "@/components/Toaster";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
import { useBuyPlayerMutation } from "@/store/services/transfers.Service";
import { refetchAll } from "@/store/slices/refetchSlice";
import { Input, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";

interface BuyTransferContentProps {
  askingPrice: number;
  playerName: string;
  transferId: string;
}

export const BuyTransferContent = ({
  askingPrice,
  playerName,
  transferId,
}: BuyTransferContentProps) => {
  const userId = useAppSelector((state: RootState) => state.auth.user?.id);
  const [offeredPrice, setOfferedPrice] = useState<number>(askingPrice);
  const [buyPlayer] = useBuyPlayerMutation();
  const dispatch = useAppDispatch()


  const handleOfferPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const offered = parseFloat(e.target.value);
    setOfferedPrice(offered);
  };

  const buy = async () => {
    if (userId) {
      try {
        const data = await buyPlayer({ buyerId: userId, transferId, offeredPrice }).unwrap()
        console.log({data})
        toaster.success({
          title: 'Done',
          description: data.message as string || 'Something Went Wrong',
        })
        dispatch(refetchAll(true))
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
        {playerName}
      </Text>
      <Text alignSelf="flex-start" color="primary.700">
        <span style={{ fontWeight: 900 }}>Asking Price: </span>
        {askingPrice} $
      </Text>
      <Input
        fontSize={20}
        type="number"
        value={offeredPrice}
        color="primary.600"
        onChange={handleOfferPriceChange}
      ></Input>
      <Text>
        <span>Note: </span>You have to transfer the player at least 95% from
        asking price
      </Text>
      <Button alignSelf="flex-end" width={150} onClick={buy}>
        B u y
      </Button>
    </VStack>
  );
};
