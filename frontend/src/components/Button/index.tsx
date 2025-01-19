import React, { forwardRef } from "react";
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean;
  isLoadingText?: string;
  children?: string;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  primary?: boolean;
  onClick?: () => void;
}

const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      isLoading,
      isLoadingText,
      children,
      iconLeft,
      iconRight,
      primary,
      onClick,
      ...restProps
    },
    ref
  ) => {
    return (
      <ChakraButton
        {...restProps}
        ref={ref}
        background={primary ? "primary.900" : "primary.200"}
        color={primary ? "primary.50" : "primary.900"}
        variant={primary ? "solid" : "ghost"}
        border="none"
        onClick={onClick}
      >
        {isLoading ? (
          isLoadingText || "Loading..."
        ) : (
          <>
            {iconLeft && iconLeft}
            {children}
            {iconRight && iconRight}
          </>
        )}
      </ChakraButton>
    );
  }
);

// Add displayName for debugging purposes
Button.displayName = "Button";

export default Button;
