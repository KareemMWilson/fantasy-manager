import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "./ball.json";
import { VStack } from "@chakra-ui/react";

export const TeamButton: React.FC<{onClick?: () => void}> = ({onClick}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <VStack
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      position="absolute"
      left="0px"
      bottom="1rem"
      cursor="pointer"
      opacity={hovered ? "1" : "0.6"}
    >
      <Lottie options={defaultOptions} height="15rem" width="15rem" />
      {hovered && <div>Take A Look on Whole Team</div>}
    </VStack>
  );
};
