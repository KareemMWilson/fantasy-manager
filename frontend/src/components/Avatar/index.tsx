import { Avatar as ChakraAvatar, AvatarIcon, HStack } from "@chakra-ui/react"


export const Avatar = () => {
  return (
    <HStack position='absolute' top={5} right={5} cursor='pointer'>
        <ChakraAvatar.Root>
            <AvatarIcon />
        </ChakraAvatar.Root>
    </HStack>
  )
}
