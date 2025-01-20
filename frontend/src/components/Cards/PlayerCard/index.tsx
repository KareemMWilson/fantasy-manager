import { Card as ChakraCard, Text, VStack } from "@chakra-ui/react";
import Button from "../../Button";
import { IoShirt } from "react-icons/io5";
import Dialog from "../../Dialog";
import { useState } from "react";
import { toaster } from "../../Toaster";
// import { useGetUserTeamQuery } from "@/store/services/team.Service";

interface PlayerCardProps {
  title: string;
  subtitleLabel: string;
  subtitleInfo: string;
  price: number;
  buttonText: string;
  refetchTransfers: () => void
}

export const PlayerCard = ({
  title,
  subtitleInfo,
  subtitleLabel,
  buttonText,
  price,
  refetchTransfers
}: PlayerCardProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  
  const handleIntiatingTransferForPlayer = async () => {
    try {
      const data = {}
      console.log(data);
    
      if (data) {
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
          text: "Initialize Transfer",
          onClick: handleIntiatingTransferForPlayer,
        }}
      >
        <VStack>
          <>Here is The Player</>
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
            {price} $
          </Text>
        </ChakraCard.Body>
        <ChakraCard.Footer justifyContent="flex-end">
          <Button onClick={() => setOpenDialog(true)}>{buttonText}</Button>
        </ChakraCard.Footer>    
      </ChakraCard.Root>
    </>
  );
};
