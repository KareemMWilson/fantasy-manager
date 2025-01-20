import { Card as ChakraCard, Text, VStack } from "@chakra-ui/react";
import Button from "../Button";
import { IoShirt } from "react-icons/io5";
import Dialog from "../Dialog";
import { useState } from "react";
import { useDeleteUserTransferMutation } from "@/store/services/transfers.Service";
import { toaster } from "../Toaster";

interface CardProps {
  title: string;
  subtitleLabel: string;
  subtitleInfo: string;
  askingPrice: number;
  buttonText: string;
  mineTransfer: boolean | undefined;
  transferId: string;
  refetchTransfers: () => void
}

export const TransferCard = ({
  title,
  subtitleInfo,
  subtitleLabel,
  askingPrice,
  buttonText,
  mineTransfer,
  transferId,
  refetchTransfers
}: CardProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [deleteTransfer] = useDeleteUserTransferMutation();
  
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
        refetchTransfers()
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error deleting transfer:", error);
      toaster.error({
        title: "Oops",
        description: error?.data?.message || 'Error While deleting transfer',
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
          {mineTransfer
            ? "Are you sure you want to cancel Transfer."
            : "Buying"}
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
            <ChakraCard.Title mt="2">{title}</ChakraCard.Title>
            <ChakraCard.Description>
              {subtitleLabel}
              {subtitleInfo}
            </ChakraCard.Description>
          </VStack>
          <Text color="primary.900" fontSize={20}>
            {askingPrice} $
          </Text>
        </ChakraCard.Body>
        <ChakraCard.Footer justifyContent="flex-end">
          <Button onClick={() => setOpenDialog(true)}>{buttonText}</Button>
        </ChakraCard.Footer>
      </ChakraCard.Root>
    </>
  );
};
