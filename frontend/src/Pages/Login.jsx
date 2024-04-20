import {
   Input,
   InputGroup,
   InputRightElement,
   Button,
   FormLabel,
   Heading,
   Container,
   FormControl,
   Box,
} from '@chakra-ui/react'
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons'
import { useAuth } from '../Components/AuthProvider'
import { useState } from 'react';

function Login() {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [show, setShow] = useState(false)
   const handleClick = () => setShow(!show)
   const auth = useAuth();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         // auth.login di return ke AuthProvider 
         await auth.login(email, password)
         return;
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <>
         <Container bg='teal.600' mt={14} borderWidth={1} borderRadius='md'>

            <form onSubmit={handleSubmit}>
               <Heading fontSize='3xl' pt={10} pb={7} align='center' >Login</Heading>

               <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                     type='email'
                     name='email'
                     size='md'
                     placeholder='Enter email'
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />
               </FormControl>

               <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size='md'>
                     <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                     <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                           {show ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                     </InputRightElement>
                  </InputGroup>
               </FormControl>

               <Box w={28} ml='auto' mr='auto'>
                  <Input
                     type='submit'
                     color='white'
                     my={10}
                     value='Login'
                     bg="blue.500"
                     _hover={{ bg: 'blue.300' }}
                     shadow='md'
                  />
               </Box>
            </form>
         </Container>
      </>
   )
}

export default Login;