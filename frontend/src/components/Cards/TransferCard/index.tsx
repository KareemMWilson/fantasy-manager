import { Card as ChakraCard, Text, VStack } from "@chakra-ui/react";
import Button from "../../Button";
import { IoShirt } from "react-icons/io5";
import Dialog from "../../Dialog";
import { useState } from "react";
import {
  Transfer,
  useDeleteUserTransferMutation,
} from "@/store/services/transfers.Service";
import { toaster } from "../../Toaster";

interface TransferCardProps {
  mineTransfer: boolean | undefined;
  refetchTransfers: () => void;
  transfer: Transfer;
}

export const TransferCard = ({
  mineTransfer,
  refetchTransfers,
  transfer,
}: TransferCardProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [deleteTransfer] = useDeleteUserTransferMutation();

  const { id: transferId, askingPrice } = transfer;
  const { name: playerName } = transfer.player;
  const { name: teamName, user } = transfer.seller;
  const { email: sellerEmail } = user;
  const buttonActionText = mineTransfer ? "Cancel Transfer" : "Buy";
  const content = mineTransfer
    ? "Are you sure you want to cancel Transfer."
    : "Buying";


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
        refetchTransfers();
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
          <Text color="primary.900" fontSize={20}>
            {askingPrice} $
          </Text>
        </ChakraCard.Body>
        <ChakraCard.Footer justifyContent="flex-end">
          <Button onClick={() => setOpenDialog(true)}>
            {buttonActionText}
          </Button>
        </ChakraCard.Footer>
      </ChakraCard.Root>
    </>
  );
};
