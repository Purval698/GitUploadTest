import express from 'express';
import { getBooks, addNewBook, getBookByTitle, updateBookDetails, deleteBookByTitle } from "../controllers/booksController.js";

const router = express.Router();

// ADD NEW BOOK METHOD
router.post('/add-new-book', addNewBook);

// GET ALL BOOKS
router.get('/books', getBooks);

//GET BOOK BY TITLE
router.get('/books/:title', getBookByTitle);

// UPDATE BOOK DETAILS
router.put('/books/:title', updateBookDetails);

// DELETE BOOK BY TITLE
router.delete('/books/:title', deleteBookByTitle);

export default router;