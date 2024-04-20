import { Input, FormLabel, Heading, Container, Box, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../module/AxiosConfig";

function UpdateBook() {
   const [title, setTitle] = useState("");
   const [author, setAuthor] = useState("");
   const [publisher, setPublisher] = useState("");
   const [year, setYear] = useState("");
   const [pages, setPages] = useState("");
   const navigate = useNavigate();
   const { id } = useParams();
   const toast = useToast();

   useEffect(() => {
      const getBookById = async () => {
         try {
            const response = await instance.get(`/books/${id}`);
            setTitle(response.data.book.title);
            setAuthor(response.data.book.author);
            setPublisher(response.data.book.publisher);
            setYear(response.data.book.year);
            setPages(response.data.book.pages);
         } catch (error) {
            console.log(error);
         }
      };
      getBookById();
   }, [id]);

   const updateBook = async (e) => {
      e.preventDefault();

      // Merubah data string ke integer 
      const yearInt = parseInt(year);
      const pagesInt = parseInt(pages);

      try {
         await instance.put(`/books/${id}`, {
            title,
            author,
            publisher,
            year: yearInt,
            pages: pagesInt,
         });
         navigate("/");
         toast({
            title: 'Success',
            description: 'Book update successfully',
            position: 'top',
            status: 'success',
            duration: 5000,
            isClosable: true,
         })
      } catch (error) {
         toast({
            title: 'Error',
            description: error.response.statusText || 'Something went wrong',
            position: 'top',
            status: 'error',
            duration: 5000,
            isClosable: true,
         })
      }
   };

   return (
      <>
         <Container borderWidth={1} borderRadius="md" my={10}>
            <form onSubmit={updateBook}>
               <Heading fontSize="2xl" pt={5} pb={5} align="center">
                  Update Book
               </Heading>

               <FormLabel>Title</FormLabel>
               <Input
                  type="text"
                  name="title"
                  size="md"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
               />

               <FormLabel>Author</FormLabel>
               <Input
                  type="text"
                  placeholder="Author"
                  size="md"
                  name="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
               />

               <FormLabel>Publisher</FormLabel>
               <Input
                  type="text"
                  placeholder="Publisher"
                  size="md"
                  name="publisher"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  required
               />

               <FormLabel>Year</FormLabel>
               <Input
                  type="number"
                  placeholder="Year"
                  size="md"
                  name="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
               />

               <FormLabel>Pages</FormLabel>
               <Input
                  type="number"
                  placeholder="Pages"
                  size="md"
                  name="pages"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  required
               />

               <Box w={28} ml='auto' mr='auto'>
                  <Input
                     type='submit'
                     color='white'
                     my={5}
                     value='Update'
                     bg="green.500"
                     _hover={{ bg: 'green.300' }}
                     shadow='md'
                  />
               </Box>
            </form>
         </Container>
      </>
   );
}

export default UpdateBook;
