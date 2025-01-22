import { HStack, VStack, Text, Box } from '@chakra-ui/react';
import { IoShirt } from "react-icons/io5";

interface PlayerPosition {
  id: string;
  title: string;
  number: string;
  stats: string;
  alignSelf?: "end" | "center";
}

const FootballFormation = () => {
  const goalkeeper: PlayerPosition[] = [
    { id: "GK", title: "Goalkeeper", number: "1", stats: "Clean Sheets: 15", alignSelf: "center" }
  ];

  const defenders: PlayerPosition[] = [
    { id: "LB", title: "Left Back", number: "3", stats: "Tackles: 45", alignSelf: "end" },
    { id: "CB1", title: "Center Back", number: "4", stats: "Blocks: 32", alignSelf: "center" },
    { id: "CB2", title: "Center Back", number: "5", stats: "Headers: 28", alignSelf: "center" },
    { id: "RB", title: "Right Back", number: "2", stats: "Assists: 8", alignSelf: "end" }
  ];

  const midfielders: PlayerPosition[] = [
    { id: "LM", title: "Left Mid", number: "7", stats: "Key Passes: 24", alignSelf: "center" },
    { id: "CM", title: "Center Mid", number: "8", stats: "Pass Acc: 92%", alignSelf: "end" },
    { id: "RM", title: "Right Mid", number: "11", stats: "Distance: 12km", alignSelf: "center" }
  ];

  const attackers: PlayerPosition[] = [
    { id: "LW", title: "Left Wing", number: "10", stats: "Goals: 12", alignSelf: "center" },
    { id: "ST", title: "Striker", number: "9", stats: "Goals: 25", alignSelf: "end" },
    { id: "RW", title: "Right Wing", number: "14", stats: "Assists: 15", alignSelf: "center" }
  ];

  const PlayerIcon = ({ title, alignSelf }: PlayerPosition) => (
    <Box
      position="relative"
      alignSelf={alignSelf}
      p={4}
      transition="transform 0.3s ease"
      _hover={{ transform: "scale(3.2)" }}
    >
      {/* Player Name */}
      {/* <Text
        position="absolute"
        top="-4"
        left="50%"
        transform="translateX(-50%)"
        fontSize="l"
        fontWeight="bold"
        color="primary.300"
        transition="all 0.3s ease"
        _groupHover={{
          transform: "translateX(-100%)",
          color: "primary.300"
        }}
      >
        Harry Kene
      </Text> */}

      {/* Icon */}
      <Box
        position="relative"
        color="primary.300"
        transition="all 0.3s ease"
        _groupHover={{
          color: "primary.300",
          filter: "drop-shadow(0 0 10px primary.300)"
        }}
      >
        <IoShirt size={50} />
      </Box>

      {/* <Text
        position="absolute"
        bottom="-4"
        left="50%"
        transform="translateX(-50%)"
        fontSize="sm"
        fontWeight="semibold"
        color="primary.300"
        transition="all 0.3s ease"
        _groupHover={{
          transform: "translateX(100%)",
          color: "primary.300"
        }}
      >
        Manchester United
      </Text> */}

      {/* <Text
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        fontSize="sm"
        fontWeight="bold"
        bg="primary.300"
        color="white"
        px={2}
        py={1}
        borderRadius="md"
        opacity={0}
        transition="all 0.3s ease"
        _groupHover={{
          opacity: 1,
          bg: "primary.300"
        }}
      >
        {title}
      </Text> */}
    </Box>
  );

  return (
    <HStack height="30rem" width="41vw" gap={3} borderRadius="xl">
      <VStack
        id="GOALKEEPER"
        height="25rem"
        alignItems="center"
        justifyContent="center"
      >
        {goalkeeper.map((player) => (
          <PlayerIcon key={player.id} {...player} />
        ))}
      </VStack>

      <VStack
        id="DEFENDER"
        height="25rem"
        width="10rem"
        alignItems="center"
        justifyContent="center"
        gap="2.5rem"
      >
        {defenders.map((player) => (
          <PlayerIcon key={player.id} {...player} />
        ))}
      </VStack>

      <VStack
        id="MIDFIELDER"
        height="25rem"
        width="10rem"
        alignItems="center"
        justifyContent="center"
        gap="4.5rem"
      >
        {midfielders.map((player) => (
          <PlayerIcon key={player.id} {...player} />
        ))}
      </VStack>

      <VStack
        id="ATTACKERS"
        height="25rem"
        width="10rem"
        alignItems="center"
        justifyContent="center"
        gap="4.5rem"
      >
        {attackers.map((player) => (
          <PlayerIcon key={player.id} {...player} />
        ))}
      </VStack>
    </HStack>
  );
};

export default FootballFormation;