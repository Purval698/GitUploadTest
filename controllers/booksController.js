import bookModel from "../models/bookModel.js";

//Get all books function started
export const getBooks = async (req, res) => {
    try {
        const books = await bookModel.find({});
        res.status(200).json({
            success: true,
            books
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
//Get all books function ended

// Get book by title function started
export const getBookByTitle = async (req, res) => {
    const bookTitle = req.params.title;
    try {
        const book = await bookModel.findOne({ title: bookTitle });
        if (!book) {
            return res.status(404).json({
                message: `Book not found with ${bookTitle} title`
            });
        }
        res.status(200).json({
            success: true,
            book
        });

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}
// Get book by title function ended

//Add new book function started
export const addNewBook = async (req, res) => {
    try {
        const { title, author, summary } = req.body;
        console.log(req.body);
        if (!title || !author || !summary) {
            return res.status(400).json({
                error: ` Missing some fields`
            });
        };
        const existingBook = await bookModel.findOne({ title: title });
        if (existingBook) {
            return res.status(400).json({
                error: `Book exist with same title`
            });
        }

        const book = await bookModel.create({ title, author, summary });
        res.status(201).send({
            success: true,
            message: `Book Added successfully`,
            book
        });
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: `something went wrong`,
            error: err
        });
    }
};
//Add new book function ended

// Update the book details function started
export const updateBookDetails = async (req, res) => {
    const bookTitle = req.params.title;
    const { author, summary } = req.body;
    try {
        const book = await bookModel.findOneAndUpdate(
            { title: bookTitle },
            { $set: { author, summary } },
            { new: true }
        );
        if (!book) {
            return res.status(404).json({
                message: `Book not found`
            });
        };
        res.status(200).json({
            success: true,
            message: `Book updated successfully`,
            book
        });

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    };
};
// Update the book details function ended

// Delete the book function started
export const deleteBookByTitle = async (req, res) => {
    const bookTitle = req.params.title;
    try {
        const book = await bookModel.findOneAndDelete({ title: bookTitle });
        if (!book) {
            return res.status(404).json({
                message: `Book not found`
            });
        };
        res.status(200).json({
            success: true,
            message: ` ${bookTitle} book deleted successfully`,
            book
        });

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    };
};
// Delete the book function ended

