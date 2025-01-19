import { Card as ChakraCard, Text, VStack } from "@chakra-ui/react";
import Button from "../Button";
import { SiPlayerfm } from "react-icons/si";

interface CardProps {
  title: string;
  subtitleLabel: string;
  subtitleInfo: string;
  askingPrice: number;
}

export const Card = ({
  title,
  subtitleInfo,
  subtitleLabel,
  askingPrice,
}: CardProps) => {
  return (
    <ChakraCard.Root width="100%" height="fit-content" borderRadius='2rem'>
      <ChakraCard.Body gap="2" flexDir="row" justifyContent='space-between' alignItems='center'>
        <SiPlayerfm size={50} />
        <VStack justifyContent='center' alignItems='center'>
          <ChakraCard.Title mt="2">{title}</ChakraCard.Title>
          <ChakraCard.Description>
            {subtitleLabel}
            {subtitleInfo}
          </ChakraCard.Description>
        </VStack>
        <Text color='primary.900' fontSize={20}>{askingPrice} $</Text>
      </ChakraCard.Body>
      <ChakraCard.Footer justifyContent="flex-end">
        <Button>Buy</Button>
      </ChakraCard.Footer>
    </ChakraCard.Root>
  );
};
