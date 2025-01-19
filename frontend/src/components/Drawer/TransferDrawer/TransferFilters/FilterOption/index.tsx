import { HStack } from "@chakra-ui/react";

interface FilterOptionProps {
  isActive: boolean;
  label: string;
  onClick: () => void;
}

export const FilterOption: React.FC<FilterOptionProps> = ({ isActive, label, onClick }) => {
  return (
    <HStack
      bg={isActive ? "primary.900" : ""}
      color={isActive ? "primary.200" : "primary.900"}
      fontSize={20}
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
      onClick={onClick}
      cursor="pointer"
      borderRadius="1rem"
    >
      {label}
    </HStack>
  );
};
