import {
   IconButton,
   Box,
   Flex,
   Button,
   useColorModeValue,
   Stack,
   useColorMode,
   HStack,
   useDisclosure,
   Heading,
   Fade,
   ButtonGroup,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useAuth } from '../Components/AuthProvider';

function Navbar() {
   const { colorMode, toggleColorMode } = useColorMode();
   const { isOpen, onToggle } = useDisclosure();
   const auth = useAuth('');

   return (
      <nav>
         <Box
            bg={useColorModeValue("gray.200", "gray.900")}
            px={10}
            w={["100%"]}
            h={20}
            pt={2}
         >
            <Flex justifyContent="space-between" alignItems='center'>
               <HStack w="42%">
                  <Heading fontSize={{ md: "2xl", sm: 'md' }} color="teal.600" as="b">
                     <a href="/">Books Collection</a>
                  </Heading>
               </HStack>

               <Flex h={16} justifyContent="space-between" alignItems="center">
                  <HStack spacing={8}>
                     <HStack
                        justifyContent="space-between"
                        spacing={2}
                        display={{ base: "none", md: "flex" }}
                     >
                        <Button
                           colorScheme="facebook"
                           _hover={{ color: "teal.500" }}
                           variant="ghost"
                        >
                           <a href="/">Home</a>
                        </Button>

                        {!auth.token ? (
                           <ButtonGroup>
                              <Button
                                 colorScheme="facebook"
                                 _hover={{ color: "teal.500" }}
                                 variant="ghost"
                              >
                                 <a href="/login">Login</a>
                              </Button>
                              <Button
                                 colorScheme="facebook"
                                 _hover={{ color: "teal.500" }}
                                 variant="ghost"
                              >
                                 <a href="/register">Register</a>
                              </Button>
                           </ButtonGroup>
                        ) : (
                           <ButtonGroup>
                              <Button
                                 colorScheme="facebook"
                                 _hover={{ color: "teal.500" }}
                                 variant="ghost"
                              >
                                 <a href="/addBook">Add Book</a>
                              </Button>
                              <Button
                                 colorScheme="facebook"
                                 _hover={{ color: "teal.500" }}
                                 variant="ghost"
                                 onClick={() => auth.logout()}
                              >
                                 Logout
                              </Button>
                           </ButtonGroup>
                        )}

                     </HStack>
                  </HStack>
                  <Stack ml={2}>
                     <Button onClick={toggleColorMode} borderRadius="md">
                        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                     </Button>
                  </Stack>

                  {isOpen ? (
                     <Fade in={isOpen} style={{ zIndex: 10 }}>
                        <Box
                           display={{ md: "none", sm: "flex" }}
                           rounded="md"
                           shadow="md"
                           pt={28}
                           ml={2}
                        >
                           <Stack spacing={1}>
                              <Button
                                 _hover={{
                                    textShadow: "teal 1px 0 10px",
                                    bg: 'gray.700',
                                    transform: "scale(1.1)",
                                 }}
                                 bg='gray.500'
                              >
                                 <a href="/">
                                    <b>Home</b>
                                 </a>
                              </Button>
                              {auth.token ? (
                                 <Stack spacing={1}>

                                    <Button
                                       _hover={{
                                          textShadow: "teal 1px 0 10px",
                                          bg: 'gray.700',
                                          transform: "scale(1.1)",
                                       }}
                                       bg="gray.500"
                                    >
                                       <a href="/addBook">
                                          <b>Add Book</b>
                                       </a>
                                    </Button>
                                    <Button
                                       _hover={{
                                          textShadow: "teal 1px 0 10px",
                                          bg: 'gray.700',
                                          transform: "scale(1.1)",
                                       }}
                                       bg="gray.500"
                                       onClick={() => auth.logout()}
                                    >
                                       <a href="/login">
                                          <b>Logout</b>
                                       </a>
                                    </Button>

                                 </Stack>
                              ) : (
                                 <Stack spacing={1}>
                                    <Button
                                       _hover={{
                                          textShadow: "teal 1px 0 10px",
                                          bg: 'gray.700',
                                          transform: "scale(1.1)",
                                       }}
                                       bg="gray.500"
                                    >
                                       <a href="/register">
                                          <b>Register</b>
                                       </a>
                                    </Button>
                                    <Button
                                       _hover={{
                                          textShadow: "teal 1px 0 10px",
                                          bg: 'gray.700',
                                          transform: "scale(1.1)",
                                       }}
                                       bg="gray.500"
                                    >
                                       <a href="/login">
                                          <b>Login</b>
                                       </a>
                                    </Button>
                                 </Stack>
                              )}
                           </Stack>
                        </Box>
                     </Fade>
                  ) : null}

                  <IconButton
                     size={"md"}
                     icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                     display={{ md: "none" }}
                     onClick={onToggle}
                     ml={2}
                     _hover={{
                        backgroundColor: "gray.600",
                        transform: "scale(1.1)",
                     }}
                  />
               </Flex>
            </Flex >
         </Box >
      </nav >
   );
}

export default Navbar