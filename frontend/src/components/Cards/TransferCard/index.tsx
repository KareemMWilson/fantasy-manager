import { Badge, Card as ChakraCard, Text, VStack } from "@chakra-ui/react";
import Button from "../../Button";
import { IoShirt } from "react-icons/io5";
import Dialog from "../../Dialog";
import { useState } from "react";
import {
  Transfer,
  useDeleteUserTransferMutation,
} from "@/store/services/transfers.Service";
import { toaster } from "../../Toaster";
import { GiBuyCard, GiCancel } from "react-icons/gi";
import { BuyTransferContent } from "@/components/Cards/TransferCard/BuyTransfer";
import { useAppDispatch } from "@/hooks/redux";
import { refetchAll } from "@/store/slices/refetchSlice";

interface TransferCardProps {
  mineTransfer: boolean | undefined;
  transfer: Transfer;
}

export const TransferCard = ({
  mineTransfer,
  transfer,
}: TransferCardProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [deleteTransfer] = useDeleteUserTransferMutation();

  const { id: transferId, askingPrice, status } = transfer;
  const { name: playerName } = transfer.player;
  const { name: teamName, user } = transfer.seller;
  const { email: sellerEmail } = user;
  const buttonActionText = mineTransfer ? "Cancel Transfer" : "Buy";
  const buttonActionIcon = mineTransfer ? <GiCancel />  : < GiBuyCard />
  const dispatch = useAppDispatch()
  const content = mineTransfer
    ? "Are you sure you want to cancel Transfer."
    : <BuyTransferContent askingPrice={askingPrice} playerName={playerName} transferId={transferId}/>


  const handleDeleteTransfer = async () => {
    try {
      const data = await deleteTransfer(transferId).unwrap();
      console.log(data);

      if (data?.success) {
        toaster.success({
          title: "Done",
          description: "Your Transfer Deleted Successfully",
        });
        setOpenDialog(false);
        dispatch(refetchAll(true))
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error deleting transfer:", error);
      toaster.error({
        title: "Oops",
        description: error?.data?.message || "Error While deleting transfer",
      });
    }
  };
  return (
    <>
      <Dialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        cancelButton={{
          text: mineTransfer ? "Cancel Transfer" : "Cancel",
          onClick: mineTransfer ? handleDeleteTransfer : undefined,
        }}
      >
        <VStack>
          {content}
        </VStack>
      </Dialog>
      <ChakraCard.Root width="100%" height="fit-content" borderRadius="2rem">
        <ChakraCard.Body
          gap="2"
          flexDir="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <IoShirt size={70} />
          <VStack justifyContent="center" alignItems="center">
            <ChakraCard.Title mt="2">{playerName}</ChakraCard.Title>
            <ChakraCard.Description>
              Seller:
              {teamName || sellerEmail}
            </ChakraCard.Description>
          </VStack>
          <VStack>
            <Badge colorPalette="green">{status}</Badge>
            <Text color="primary.900" fontSize={20}>
              {askingPrice} $
            </Text>
          </VStack>
        </ChakraCard.Body>
        <ChakraCard.Footer justifyContent="flex-end">
          <Button onClick={() => setOpenDialog(true)} iconRight={buttonActionIcon}>
            {buttonActionText}
          </Button>
        </ChakraCard.Footer>
      </ChakraCard.Root>
    </>
  );
};
