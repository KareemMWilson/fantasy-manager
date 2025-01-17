import { Drawer } from "@/components/Drawer";
import { HStack, VStack } from "@chakra-ui/react";
import { IoShirt } from "react-icons/io5";

const Home = () => {
  return (
    // <Spinner width='20rem' height='20rem' color='primary.900' borderWidth='6px' opacity='0.6'/>
    <>
    <HStack height="40rem" width="40vw">
      <VStack id='GOALKEEPER' height="25rem" alignItems='center' justifyContent='center'>
        <VStack style={{ fontSize: "2rem" }}><IoShirt size={60}/></VStack>
      </VStack>
      <VStack id='DEFENDER' height="25rem" width='10rem' alignItems='center' justifyContent='center' gap='4.5rem'>
        <VStack style={{ fontSize: "2rem" }} alignSelf='end'><IoShirt size={60}/></VStack>
        <VStack style={{ fontSize: "2rem" }}><IoShirt size={60}/></VStack>
        <VStack style={{ fontSize: "2rem" }}><IoShirt size={60}/></VStack>
        <VStack style={{ fontSize: "2rem" }}alignSelf='end'><IoShirt size={60}/></VStack>
      </VStack>
      <VStack id='MIDEFENDER' height="25rem" width='10rem' alignItems='center' justifyContent='center' gap='4.5rem'>
        <VStack style={{ fontSize: "2rem" }}><IoShirt size={60}/></VStack>
        <VStack style={{ fontSize: "2rem" }} alignSelf='end'><IoShirt size={60}/></VStack>
        <VStack style={{ fontSize: "2rem" }}><IoShirt size={60}/></VStack>
      </VStack>
      <VStack id='ATTACKERS' height="25rem" width='10rem' alignItems='center' justifyContent='center' gap='4.5rem'>
        <VStack style={{ fontSize: "2rem" }}><IoShirt size={60}/></VStack>
        <VStack style={{ fontSize: "2rem" }}alignSelf='end'><IoShirt size={60}/></VStack>
        <VStack style={{ fontSize: "2rem" }}><IoShirt size={60}/></VStack>
      </VStack>
    </HStack>
    <Drawer />
    </>

  );
};

export default Home;
