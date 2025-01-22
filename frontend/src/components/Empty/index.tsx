import { EmptyState } from "@chakra-ui/react";

interface EmptyProps {
  title: string;
  description: string;
}

export const Empty: React.FC<EmptyProps> = ({ title, description }) => {
  return (
    <EmptyState.Root>
      <EmptyState.Title>{title}</EmptyState.Title>
      <EmptyState.Description>{description}</EmptyState.Description>
    </EmptyState.Root>
  );
};
