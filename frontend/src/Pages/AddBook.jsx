import { Input, FormLabel, Heading, Container, Box, useToast } from "@chakra-ui/react";
import instance from "../module/AxiosConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBook() {
   const [title, setTitle] = useState("");
   const [author, setAuthor] = useState("");
   const [publisher, setPublisher] = useState("");
   const [year, setYear] = useState("");
   const [pages, setPages] = useState("");
   const [image, setImage] = useState(null);
   const navigate = useNavigate();
   const toast = useToast();

   const handleSubmit = async (e) => {
      e.preventDefault();

      // Membuat object FormData 
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("publisher", publisher);
      formData.append("year", year);
      formData.append("pages", pages);
      formData.append("image", image);

      try {
         await instance.post("/books", formData, {
            headers: { "Content-Type": "multipart/form-data" },
         });
         navigate("/");
         toast({
            title: 'Success',
            description: 'Create new book successfully',
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

   // handle file
   const handleFile = (e) => {
      setImage(e.target.files[0]);
   };

   return (
      <>
         <Container borderWidth={1} borderRadius="md" my={5}>
            <form onSubmit={handleSubmit}>
               <Heading fontSize="2xl" pt={5} pb={5} align="center">
                  Add Book
               </Heading>

               <FormLabel>Title</FormLabel>
               <Input
                  type="text"
                  name="title"
                  size="md"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  required
               />

               <FormLabel>Author</FormLabel>
               <Input
                  type="text"
                  placeholder="Author"
                  size="md"
                  name="author"
                  onChange={(e) => setAuthor(e.target.value)}
                  required
               />

               <FormLabel>Publisher</FormLabel>
               <Input
                  type="text"
                  placeholder="Publisher"
                  size="md"
                  name="publisher"
                  onChange={(e) => setPublisher(e.target.value)}
                  required
               />

               <FormLabel>Year</FormLabel>
               <Input
                  type="number"
                  placeholder="Year"
                  size="md"
                  name="year"
                  onChange={(e) => setYear(e.target.value)}
                  required
               />

               <FormLabel>Pages</FormLabel>
               <Input
                  type="number"
                  placeholder="Pages"
                  size="md"
                  name="pages"
                  onChange={(e) => setPages(e.target.value)}
                  required
               />

               <FormLabel>Image</FormLabel>
               <Input
                  type="file"
                  placeholder="Image"
                  size="md"
                  name="image"
                  onChange={handleFile}
                  required
               />

               <Box w={28} ml='auto' mr='auto'>
                  <Input
                     type='submit'
                     color='white'
                     my={5}
                     value='Submit'
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

export default AddBook;
