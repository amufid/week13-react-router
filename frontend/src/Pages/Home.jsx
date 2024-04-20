import {
   Text,
   Image,
   Stack,
   Heading,
   Grid,
   Spinner,
   Wrap,
   Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import instance from "../module/AxiosConfig";
import { Link } from "react-router-dom";
import Footer from '../Components/Footer';

function Home() {
   const [books, setBooks] = useState([]);
   const [loading, setLoading] = useState(true);

   const getAllBooks = async () => {
      try {
         const response = await instance.get("/books");
         const dataBooks = response.data.books;

         setBooks(dataBooks);
         setTimeout(() => {
            setLoading(false);
         }, 1000);
      } catch (error) {
         console.log("error", error);
         setLoading(false);
      }
   };

   useEffect(() => {
      getAllBooks();
   }, []);

   return (
      <>
         <Box align="center" my={5}>
            <Heading as="b" fontSize="2xl">
               All Books
            </Heading>
         </Box>

         {loading ? (
            // Tampilkan pesan loading 
            <Stack alignItems={"center"} justifyContent={"center"} py='20%'>
               <Spinner size="xl" />
            </Stack>
         ) : (
            <Wrap mb={5}>
               <Grid
                  templateColumns={{ md: "repeat(5, 1fr)", sm: "repeat(1, 1fr)" }}
                  gap={5}
                  ml="auto"
                  mr="auto"
               >
                  {books.map((book) => (
                     <Box
                        variant="outline"
                        key={book.id}
                        my={1}
                        align="center"
                        w={220}
                        h={360}
                        borderRadius="md"
                        shadow="md"
                     >
                        <Image
                           objectFit="cover"
                           m={2}
                           width={200}
                           height={260}
                           src={`http://localhost:8000/${book.image}`}
                        />

                        <Stack>
                           <Link to={`/book/${book.id}`}>
                              <Heading size="sm" mt={3} _hover={{ color: "blue" }}>
                                 {book.title}
                              </Heading>
                           </Link>
                           <Text pt="2" fontSize="sm">
                              by {book.author}
                           </Text>
                        </Stack>
                     </Box>
                  ))}
               </Grid>
            </Wrap>
         )}
         <Footer />
      </>
   );
}

export default Home;
