import {
   Text,
   Image,
   Button,
   Heading,
   HStack,
   VStack,
   Popover,
   PopoverTrigger,
   PopoverContent,
   PopoverHeader,
   PopoverBody,
   PopoverFooter,
   PopoverArrow,
   PopoverCloseButton,
   Box,
   useToast,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import instance from "../module/AxiosConfig";
import { useParams, useNavigate, Link } from "react-router-dom";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useAuth } from "../Components/AuthProvider";

function DetailBook() {
   const [book, setBook] = useState("");
   const { id } = useParams(true);
   const navigate = useNavigate();
   const initialFocusRef = useRef();
   const auth = useAuth();
   const toast = useToast();

   useEffect(() => {
      const getBookById = async () => {
         try {
            const response = await instance.get(`/books/${id}`);
            setBook(response.data.book);
         } catch (error) {
            console.log(error);
         }
      };
      getBookById();
   }, [id]);

   const deleteBook = async () => {
      try {
         await instance.delete(`books/${id}`);
         navigate("/");
         toast({
            title: "Success",
            description: "Book deleted successfully",
            position: "top",
            status: "success",
            duration: 5000,
            isClosable: true,
         });
      } catch (error) {
         toast({
            title: 'Error',
            description: error.response.data.message || 'Something went wrong',
            position: 'top',
            status: 'error',
            duration: 5000,
            isClosable: true,
         })
      }
   };

   return (
      <VStack
         m={5}
         key={book.id}
         direction={"row"}
         w={270}
         h="100%"
         shadow="md"
         borderWidth={1}
         borderRadius="md"
         ml="auto"
         mr="auto"
         spacing={2}
      >
         <Box>
            <Image
               objectFit="cover"
               m={5}
               w={230}
               h={290}
               src={`http://localhost:8000/${book.image}`}
            />
         </Box>
         <Box mb={5}>
            <Heading size="md">Title : {book.title}</Heading>
            <Text pt="2">Author : {book.author}</Text>
            <Text>Publisher : {book.publisher}</Text>
            <Text>Pages : {book.pages}</Text>
            <Text>Year : {book.year}</Text>

            {auth.token && (
               <HStack mt={5}>
                  <Link to={`/updateBook/${book.id}`}>
                     <Button colorScheme="blue">
                        <EditIcon m={1} />
                        Edit
                     </Button>
                  </Link>

                  <Popover
                     initialFocusRef={initialFocusRef}
                     placement="bottom"
                     closeOnBlur={false}
                  >
                     <PopoverTrigger>
                        <Button colorScheme="red">
                           <DeleteIcon m={1} />
                           Delete
                        </Button>
                     </PopoverTrigger>
                     <PopoverContent
                        color="white"
                        bg="blue.800"
                        borderColor="blue.800"
                     >
                        <PopoverHeader pt={4} fontWeight="bold" border="0">
                           Confirm Delete
                        </PopoverHeader>
                        <PopoverArrow bg="blue.800" />
                        <PopoverCloseButton />
                        <PopoverBody>Are you sure you want to delete this?</PopoverBody>
                        <PopoverFooter
                           border="0"
                           display="flex"
                           alignItems="center"
                           justifyContent="space-between"
                           pb={4}
                        >
                           <Button onClick={deleteBook} colorScheme="red">
                              <DeleteIcon m={1} />
                              Delete
                           </Button>
                        </PopoverFooter>
                     </PopoverContent>
                  </Popover>
               </HStack>
            )}
         </Box>
      </VStack>
   );
}

export default DetailBook;
