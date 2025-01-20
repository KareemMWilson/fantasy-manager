import React, { useEffect } from "react";
import { Box, VStack, HStack, Text, Portal } from "@chakra-ui/react";
import Button from "../Button";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  confirmButton?: {
    text: string;
    onClick?: () => void;
  };
  cancelButton?: {
    text: string;
    onClick?: () => void;
  };
}

const Dialog = ({
  isOpen,
  onClose,
  title,
  children,
  confirmButton,
  cancelButton,
}: DialogProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Portal disabled>
      <Box
        position="fixed"
        top="0"
        left="0"
        w="100vw"
        h="100vh"
        bg="blackAlpha.700"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex={9999999}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <Box
          bg="white"
          borderRadius="lg"
          boxShadow="2xl"
          maxW="500px"
          w="90%"
          p={6}
          zIndex={99999999}
        >
          <VStack gap={6} align="stretch">
            {title && (
              <Text
                fontSize="2xl"
                fontWeight="bold"
                textAlign="center"
                color="green.600"
              >
                {title}
              </Text>
            )}
            <Box fontSize="md" color="gray.700">
              {children}
            </Box>
            <HStack justify="flex-end" gap={4}>
              {cancelButton && (
                <Button
                  variant="outline"
                  colorScheme="gray"
                  cursor="pointer"
                  onClick={cancelButton.onClick || onClose}
                  _hover={{ bg: "gray.100" }}
                >
                  {cancelButton.text}
                </Button>
              )}
              {confirmButton && (
                <Button
                  colorScheme="blue"
                  cursor="pointer"
                  onClick={confirmButton.onClick}
                  _hover={{ bg: "blue.500", color: "white" }}
                >
                  {confirmButton.text}
                </Button>
              )}
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Portal>
  );
};

export default Dialog;
