import Button from "@/components/Button";
import { QueryType } from "@/store/services/transfers.Service";
import { HStack, Input, Slider, VStack } from "@chakra-ui/react";
import { GrClear, GrFilter } from "react-icons/gr";

export const FilterQuery = ({
  setSearchQuery,
  searchQuery
}: {
  setSearchQuery: React.Dispatch<React.SetStateAction<QueryType>>;
  searchQuery: QueryType
}) => {
  const handleSliderChange = (newRange: { value: [number, number] }) => {
    setSearchQuery((prev) => ({
      ...prev,
      priceRange: newRange.value,
    }));
  };

  const handleSearchQuery = (key: keyof QueryType, value: string) => {
    setSearchQuery((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <HStack
      gap={4}
      width="100%"
      borderWidth="1px"
      p={1}
      borderColor="primary.200"
      borderRadius="10px"
      marginY={10}
    >
      <VStack>
        <HStack>
          <Input
            placeholder="Team Name"
            value={searchQuery.teamName}
            onChange={(e) => handleSearchQuery("teamName", e.target.value)}
            color="green.900"
          />
          <Input
            placeholder="Player Name"
            value={searchQuery.playerName}
            onChange={(e) => handleSearchQuery("playerName", e.target.value)}
            color="green.900"
          />
        </HStack>
        <Slider.Root
          width="100%"
          defaultValue={searchQuery.priceRange}
          min={0}
          max={2000000}
          step={100}
          onValueChange={handleSliderChange}
        >
          <Slider.Label color="primary.900">Price</Slider.Label>
          <Slider.ValueText color="primary.900">
            {`$${searchQuery.priceRange[0].toLocaleString()} - $${searchQuery.priceRange[1].toLocaleString()}`}
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
        <Button
          iconRight={<GrFilter />}
          // onClick={}
        ></Button>
        <Button
          iconRight={<GrClear />}
          // onClick={}
        ></Button>
      </HStack>
    </HStack>
  );
};
