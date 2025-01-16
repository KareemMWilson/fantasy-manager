import React from "react";
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean | undefined;
  isLoadingText?: string;
  children?: string;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  primary?: boolean;
  onClick?: () => void
}

const Button: React.FC<CustomButtonProps> = ({
  isLoading,
  isLoadingText,
  children,
  iconLeft,
  iconRight,
  primary,
  onClick,
  ...restProps
}) => {
  return (
    <ChakraButton 
      {...restProps} 
      background={primary ? 'primary.900' : 'primary.200'}
      color={primary ? 'primary.50' : 'primary.900'}
      variant={primary ? 'solid' : 'ghost'}
      border='none'
      onClick={onClick}
    >
      {isLoading ? (
        isLoadingText || "Loading..."
      ) : (
        <>
          {iconLeft ? iconLeft : null}
          {children}
          {iconRight ? iconRight : null}
        </>
      )}
    </ChakraButton>
  );
};

export default Button;
