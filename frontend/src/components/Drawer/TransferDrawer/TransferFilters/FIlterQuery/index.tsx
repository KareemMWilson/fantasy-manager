import Button from "@/components/Button";
import { useGetGlobalTransfersQuery, useLazyGetGlobalTransfersQuery } from "@/store/services/transfers.Service";
import { HStack, Input, Slider, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { GrClear, GrFilter } from "react-icons/gr";

export const FilterQuery = () => {
  const [teamName, setTeamName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [trigger, {data, error, isLoading}] = useLazyGetGlobalTransfersQuery();
  
  const handleSliderChange = (newRange: {value: [number,number]}) => {
    setPriceRange(newRange.value);
  };

  const handleFilter = () => {
    const quary = {
      teamName,
      playerName,
      price: priceRange
    }
    
    trigger(quary)
  }

  return (
    <HStack gap={4} width="100%" borderWidth='1px' p={1} borderColor='primary.200' borderRadius='10px'>
      <VStack>
        <HStack>
          <Input
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            color="green.900"
          />
          <Input
            placeholder="Player Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            color="green.900"
          />
        </HStack>
        <Slider.Root
          width="100%"
          defaultValue={priceRange}
          min={0}
          max={5000000}
          step={100}
          onValueChange={handleSliderChange}
        >
          <Slider.Label color="primary.900">Price</Slider.Label>
          <Slider.ValueText color="primary.900">
            {`$${priceRange[0].toLocaleString()} - $${priceRange[1].toLocaleString()}`}
          </Slider.ValueText>
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb index={0}>
              <Slider.HiddenInput />
            </Slider.Thumb>
            <Slider.Thumb index={1}>
              <Slider.HiddenInput />
            </Slider.Thumb>
          </Slider.Control>
        </Slider.Root>
      </VStack>
      <HStack>
        <Button iconRight={<GrFilter />} onClick={handleFilter}></Button>
        <Button
          iconRight={<GrClear />}
          onClick={() => {
            setTeamName("");
            setPlayerName("");
            setPriceRange([0, 5000000]);
          }}
        ></Button>
      </HStack>
    </HStack>
  );
};
