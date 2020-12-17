import asyncHandler from 'express-async-handler';
import Book from '../models/book.js';

/*
@desc    Fetch all books
@route   GET /api/books
@access  Public
 */
const getBooks = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
        ? {
              title: {
                  $regex: req.query.keyword,
                  $options: 'i',
              },
          }
        : {};

    const books = await Book.find({ ...keyword });

    res.json({ books });
});

/*
@desc    Fetch a single book
@route   GET /api/books/:id
@access  Public
 */
const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (book) {
        res.json(book);
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (book) {
        await book.remove();
        res.json({ message: 'Book removed' });
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
});

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
const createBook = asyncHandler(async (req, res) => {
    const book = new Book({
        title: 'Sample title',
        user: req.user._id,
        image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN7F4IXSW6I8Ic59y3wu3Ef3OOYIdV0IzEmA&usqp=CAU',
        isbn: 'Sample isbn',
        numReviews: 0,
        description: 'Sample description',
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
});

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = asyncHandler(async (req, res) => {
    const { title, isbn, description, image } = req.body;

    const book = await Book.findById(req.params.id);

    if (book) {
        book.title = title;

        book.description = description;
        book.image = image;
        book.isbn = isbn;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
});

export { getBooks, getBookById, deleteBook, createBook, updateBook };
