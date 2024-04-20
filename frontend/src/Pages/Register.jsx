import { useState } from "react";
import {
   Input,
   InputGroup,
   InputRightElement,
   Button,
   FormControl,
   FormLabel,
   Text,
   Container,
   Link,
   Alert,
   AlertIcon,
   Box,
   useToast,
   Heading,
} from "@chakra-ui/react";
import instance from "../module/AxiosConfig";
import { useNavigate } from "react-router-dom";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";

function Register() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [show, setShow] = useState(false);
   const [passwordWrong, setWrongPassword] = useState(false);
   const navigate = useNavigate();
   const handleClick = () => setShow(!show);
   const toast = useToast();

   const handleSubmit = async (e) => {
      e.preventDefault();

      // Validasi password 
      if (e.target.password.value !== e.target.password2.value) {
         setWrongPassword(true);
         return;
      }

      try {
         await instance.post("/register", {
            name,
            email,
            password,
         });
         navigate("/login");
         toast({
            title: "Success",
            description: "User registration was successful",
            position: "top",
            status: "success",
            duration: 5000,
            isClosable: true,
         });
      } catch (error) {
         toast({
            title: "Error",
            description: error.response.data.message || "Something went wrong",
            position: "top",
            status: "error",
            duration: 5000,
            isClosable: true,
         });
      }
   };

   return (
      <>
         <Container borderWidth={1} borderRadius="md" bg="teal.600" mt={10}>
            <form onSubmit={handleSubmit}>
               <Heading fontSize="3xl" pt={10} pb={7} align="center">
                  Register
               </Heading>

               {passwordWrong && (
                  <Alert status="error" mb={2}>
                     <AlertIcon />
                     Passwords do not match!
                  </Alert>
               )}

               <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                     type="email"
                     name="email"
                     size="md"
                     placeholder="Email"
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />
               </FormControl>

               <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                     type="text"
                     placeholder="Username"
                     size="md"
                     name="username"
                     onChange={(e) => setName(e.target.value)}
                     required
                  />
               </FormControl>

               <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="md">
                     <Input
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                     <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                           {show ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                     </InputRightElement>
                  </InputGroup>
               </FormControl>

               <FormControl isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup size="md">
                     <Input
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Confirm password"
                        name="password2"
                        required
                     />
                     <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                           {show ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                     </InputRightElement>
                  </InputGroup>
               </FormControl>

               <Box w={28} ml="auto" mr="auto">
                  <Input
                     type="submit"
                     color="white"
                     my={5}
                     value="Register"
                     bg="green.500"
                     _hover={{ bg: "green.300" }}
                     shadow="md"
                  />
               </Box>

               <Text align="center" mb={10}>
                  Do you already have an account?{" "}
                  <span>
                     <Link href="/login">Login</Link>
                  </span>
               </Text>
            </form>
         </Container>
      </>
   );
}

export default Register;
