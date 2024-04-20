import {
   Stack, Link, IconButton, useColorModeValue, Text, Container, VStack,
} from '@chakra-ui/react';
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

const accounts = [
   {
      url: '',
      label: 'Github Account',
      type: 'gray',
      icon: <FaGithub />
   },
   {
      url: '',
      label: 'Twitter Account',
      type: 'gray',
      icon: <FaTwitter />
   },
   {
      url: '',
      label: 'LinkedIn Account',
      type: 'gray',
      icon: <FaInstagram />
   }
];

const Footer = () => {
   return (
      <Container maxW="100%" p={10} bg={useColorModeValue("gray.200", "gray.900")}>
         <Stack direction={{ base: 'column', md: 'row' }} spacing={5} justifyContent='space-between'>

            <VStack direction='row' align='left' spacing={3} d={{ sm: 'none', md: 'flex' }}>
               <Text as='b' fontSize='md'>Books Collection</Text>
               <Link color='gray.500'>
                  Books
               </Link>
               <Link color='gray.500'>
                  About
               </Link>
               <Link color='gray.500'>
                  Profile
               </Link>
               <Link color='gray.500'>
                  Help
               </Link>
            </VStack>

            <VStack direction="row" spacing={3} pt={{ sm: 4, md: 0 }} alignItems="center">
               <Text as='b' fontSize='md'>Connect</Text>
               <Stack direction="row">
                  {accounts.map((sc, index) => (
                     <IconButton
                        key={index}
                        as={Link}
                        isExternal
                        href={sc.url}
                        aria-label={sc.label}
                        colorScheme={sc.type}
                        icon={sc.icon}
                        rounded="md"
                     />
                  ))}
               </Stack>
            </VStack>

            <VStack align="center">
               <Text color="gray.500">
                  Made with 🧡 by
                  <Link
                     _focus={{ boxShadow: 'none', outline: 'none' }}
                     target="_blank"
                     color="gray.400"
                     bgClip="text"
                     bgGradient="linear(to-l, teal, green)"
                     _hover={{
                        bgGradient: 'linear(to-r, red.500, yellow.500)'
                     }}
                  >
                     Abdul Mufid
                  </Link>
               </Text>
            </VStack>
         </Stack>
      </Container >
   );
};


export default Footer;