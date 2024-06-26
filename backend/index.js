const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

async function authenticateTokenMiddleware(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(401).json({ message: 'Unauthorized' });

    const user = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = user.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token tidak valid/expired' });
  }
}

app.use(express.json());
app.use(cors({
  origin: 'https://books-collection-psi.vercel.app',
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://books-collection-psi.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.use('/uploads', express.static('uploads'));

// Set up multer middleware to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, Date.now() + '-' + fileName);
  }
});

const upload = multer({
  storage: storage, limits: { fileSize: 10000000 } // 10MB limit
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const { password: passwordDB, ...user } = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.json({ user });
  }
  catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }

});

// create a book 
app.post("/books", authenticateTokenMiddleware, upload.single('image'), async (req, res) => {
  const { title, author, publisher, year, pages } = req.body;
  try {
    const book = await prisma.book.create({
      data: {
        title,
        author,
        publisher,
        year: parseInt(year),
        pages: parseInt(pages),
        image: req.file.path // add the path to the uploaded image to the book data
      },
    });
    res.json({ book });
  }
  catch (err) {
    console.log("err", err);
    res.status(400).json({ message: "Book already exists" });
  }

});

// get all books
app.get("/books", async (req, res) => {
  const books = await prisma.book.findMany();
  res.json({ books });
}
);

// edit a book
app.put("/books/:id", authenticateTokenMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publisher, year, pages } = req.body;
    const book = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        title,
        author,
        publisher,
        year,
        pages,
      },
    });
    res.json({ book });
  }
  catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
});


// delete a book
app.delete("/books/:id", authenticateTokenMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.delete({
      where: { id: Number(id) },
    });
    res.json({ book });
  }
  catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong" });
  }
});

// get book by id 
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });
    res.json({ book });
  }
  catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong" });
  }
});

// Start the server
app.listen(8000, () => {
  console.log('Server started on port 8000');
});

module.export = app;
