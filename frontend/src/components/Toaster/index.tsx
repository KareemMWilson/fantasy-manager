import { createToaster, Toast, Toaster as ChakraToaster, Portal } from "@chakra-ui/react";
import { BiXCircle } from "react-icons/bi";

export const toaster = createToaster({
  placement: "bottom-end",
  overlap: true,
  gap: 24,
  duration: 6000
});

export const Toaster = () => {
  return ( 
    <Portal>
    <ChakraToaster toaster={toaster} zIndex={99999999}>
      {(toast) => (
        <Toast.Root key={toast.id} width='25rem' height='4rem' borderRadius='1rem' alignItems='center'>
          <Toast.Title>{toast.title}</Toast.Title>
          <Toast.Description>{toast.description}</Toast.Description>
          <Toast.CloseTrigger background='inherit' height='3.4rem' position='initial'>
            <BiXCircle size={30} />
          </Toast.CloseTrigger>
        </Toast.Root>
      )}
    </ChakraToaster>
    </Portal>
  );
};
